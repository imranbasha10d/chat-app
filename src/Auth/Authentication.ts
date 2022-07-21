import { NextFunction as Next, Request as Req, Response as Res } from "express";
import jwt from 'jsonwebtoken'
import { Response } from "../Utils/Response";
import { Log } from "../Logger";
import { UserRoles } from "../Utils/Types";

const getIdFromRequest = {
    getIdFromParamAsId: (res: Req)=>{
        const id = res.params.id;
        return id;
    },
    getIdFromBodyAsId: (res: Req)=>{
        const { id } = res.body;
        return id;
    },
    getIdFromBodyAsUserId: (res: Req)=>{
        const { userId } = res.body;
    }
}

export class Auth {
    constructor(){}
    public getToken(authHeader: string) {
        //BEARER TOKEN
        if (!authHeader){
            return null;
        } 
        const token = authHeader.split(' ')[1];
        Log.info("split auth token from header", token);
        if (!token){
            return null;
        }
        return token;
    }
    public getUserIdFromToken(token: string) {
        const getUser: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        if (!getUser && !getUser.user) {
            return null;
        }
        return getUser.user;
    }
    public checkValidUser(req: Req, res: Res, next: Next) {
        const authHeader = req.header('Authorization');
        Log.info('authHeader: ', authHeader);
        if (!authHeader){
            return res.status(400).json(Response.badRequest('Auth Header Not Found'));
        } 
        const token = authHeader.split(' ')[1];
        Log.info("split auth token from header", token);
        if(!token){
            return res.status(400).json(Response.badRequest('Auth Token Not Found'));
        }
        try {
            // const userId = this.getUserIdFromToken(token);
            const jwtObject: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
            if (!jwtObject && !jwtObject.user) {
                res.status(400).json(Response.badRequest('Invalid Auth Token'));
            }
            req["userId"] = jwtObject.userId;
            next();
        } catch (e) {
            res.status(400).json(Response.badRequest('Invalid Auth Token'));
        }
    }
    public checkSameUser(req: Req, res: Res, next: Next) {
        const authHeader = req.header('Authorization');
        const token = this.getToken(authHeader);
        if(!token){
            return res.status(400).json(Response.badRequest('Auth Token Not Found'));
        }
        try {
            const userId = this.getUserIdFromToken(token);
            next();
        } catch (e) {
            res.status(400).json(Response.badRequest('Invalid Auth Token'));
        }
    }
    public generateToken(userId: string, role: UserRoles) {
        const token = jwt.sign({
            expiresIn: "3h",
            userId,
            role,
        }, process.env.ACCESS_TOKEN_SECRET_KEY);

        return token;
    }
}