import { NextFunction as Next, Request as Req, Response as Res } from "express";
import jwt from 'jsonwebtoken'
import { Response, RESPONSE_MEESAGE } from "../Utils/response";
import { Log } from "../Logger";
import { UserRoles } from "../Utils/types";
import { authRolesOfPath, getIdMethodOfPath, getIdMethods } from "../Utils/authConfigUrls";
import { statusCode } from "../Utils/statusCodes";

export class Auth {
    constructor() {
        this.generateNewToken = this.generateNewToken.bind(this);
        this.getTokenFromHeader = this.getTokenFromHeader.bind(this);
        this.getAuthRoleFromRequest = this.getAuthRoleFromRequest.bind(this);
        this.getRequesterIdFromRequest = this.getRequesterIdFromRequest.bind(this);
        this.checkAdminValidation = this.checkAdminValidation.bind(this);
        this.checkAdminOrSameUserValidation = this.checkAdminOrSameUserValidation.bind(this);
        this.checkSameUserValidation = this.checkSameUserValidation.bind(this);
        this.checkUserValidation = this.checkUserValidation.bind(this);
    }
    generateNewToken = (userId: string, role: UserRoles) => {
        Log.info("generateNewToken input: userId: ", userId);
        Log.info("generateNewToken input: role: ", role);
        const token = jwt.sign({
            userId,
            role,
        }, process.env.ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: 3600,
        });
        Log.info('return from generateNewToken method', token);
        return token;
    }
    getTokenFromHeader = (header: string) => {
        Log.info("getTokenFromHeader input: header: ", header);
        if (!header) return null;
        const token = header.split(' ')[1];
        Log.info("split token from header", token);
        if (!token) return null;
        Log.info('return from getTokenFromHeader method', token);
        return token;
    }
    getAuthRoleFromRequest = (request: Req): string => {
        const { route: { path } } = request;
        Log.info("getAuthRoleFromRequest input: path: ", path);
        for (const role in authRolesOfPath) {
            if (authRolesOfPath[role].includes(path)) return role;
        }
        return null;
    }
    getRequesterIdFromRequest = (request: Req) => {
        const { route: { path } } = request;
        Log.info("getRequesterIdFromRequest input: path: ", path);
        for (const methodName in getIdMethodOfPath) {
            if (getIdMethodOfPath[methodName].includes(path)) {
                Log.info("findGetIdMethod: methodName: ", methodName);
                const getRequesterIdMethod = getIdMethods[methodName];
                Log.info("requestMethod: ", getRequesterIdMethod);
                if (!getRequesterIdMethod) return null;
                return getRequesterIdMethod(request);
            };
        }
        return null;
    }
    checkAdminValidation = (decode: any): boolean => {
        const { role } = decode;
        if (!role || role != UserRoles.admin) return false;
        return true;
    }
    checkAdminOrSameUserValidation = (req: Req, decode: any): boolean => {
        const { role, userId } = decode;
        if (!role) return false;
        else if (role == UserRoles.admin) return true;

        const id = this.getRequesterIdFromRequest(req);
        Log.info("getIdFromRequest: ", id);
        if (userId == id) return true;
        return false;
    }
    checkSameUserValidation = (req: Req, decode: any): boolean => {
        const { role, userId } = decode;
        if (!role) return false;

        const id = this.getRequesterIdFromRequest(req);
        Log.info("getIdFromRequest: ", id);
        if (userId == id) return true;
        return false;
    }
    checkUserValidation = (req: Req, res: Res, next: Next) => {
        try {
            Log.info("Enter into checkValidUser")
            const authHeader = req.header('Authorization');
            Log.info('authHeader in the request: ', authHeader);
            if (!authHeader) return res.status(statusCode.badRequest).json(Response.badRequest(RESPONSE_MEESAGE["AUTH_HEADER_NOT_FOUND"]));
            const token = this.getTokenFromHeader(authHeader);
            Log.info('Return from getTokenFromHeadermethod', token);
            if (!token) return res.status(statusCode.badRequest).json(Response.badRequest(RESPONSE_MEESAGE["AUTH_TOKEN_NOT_FOUND"]));
            const decode: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
            Log.info("Get decode value from token", decode);
            if (!decode) return res.status(400).json(Response.badRequest(RESPONSE_MEESAGE["INVALID_AUTH_TOKEN"]));
            const authRole = this.getAuthRoleFromRequest(req);
            Log.info("Return value from getAuthRoleFromRequestmethod : authRole: ", authRole);
            let isValidaUser = false;
            if (authRole == 'admin') {
                isValidaUser = this.checkAdminValidation(decode);
                Log.info("Check value from checkAdminValidation", isValidaUser);
            } else if (authRole == 'adminOrSameUser') {
                isValidaUser = this.checkAdminOrSameUserValidation(req, decode);
                Log.info("Check value from checkAdminOrSameUserValidation", isValidaUser);
            } else if (authRole == 'sameUser') {
                isValidaUser = this.checkSameUserValidation(req, decode);
                Log.info("Check value from checkSameUserValidation", isValidaUser);
            } else {
                isValidaUser = true;
            }
            if (!isValidaUser) return res.status(statusCode.badRequest).json(Response.badRequest(RESPONSE_MEESAGE["UNAUTHORIZED_ACCESS"]));
            Log.info("User is vallid");
            next();
        } catch (error) {
            Log.error("Error in checkValidUser ", error.message);
            res.status(400).json(Response.badRequest(RESPONSE_MEESAGE["INVALID_AUTH_TOKEN"]));
        }
    }
}