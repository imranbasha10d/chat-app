import { Request as Req } from "express";
import { userRoutesPath, personalInfoRoutesPath, postRoutesPath, userRelationRoutesPath } from "./routes";
import { Log } from "../Logger";

export const authRolesOfPath = {
    adminUser: [],
    adminOrSameUser: [
        userRoutesPath.deleteUserById,
        personalInfoRoutesPath.updatePersonalInfoById,
        personalInfoRoutesPath.createPersonalInfo,
        postRoutesPath.createPost,
        postRoutesPath.deletePostById,
        postRoutesPath.deleteAllPostsById,
        userRelationRoutesPath.deleteUserRelation,
        userRelationRoutesPath.deleteUserRelationAllById
    ],
    sameUser: [
        userRoutesPath.updatePasswordById,
        postRoutesPath.userFeedsById,
        postRoutesPath.updatePostCaptionById,
        userRelationRoutesPath.userRequestSend,
        userRelationRoutesPath.requestById,
        postRoutesPath.updatePostCaptionById,
    ],
    allUsers: [
        userRoutesPath.userById,
        personalInfoRoutesPath.personalInfoById,
        postRoutesPath.postById,
        postRoutesPath.allPostsById,
        userRelationRoutesPath.followersById,
        userRelationRoutesPath.followingById,
        userRelationRoutesPath.userRequestAcceptById,
    ],
}

export const getIdMethodOfPath = {
    getIdFromParamAsId: [
        userRoutesPath.updatePasswordById,
        userRoutesPath.deleteUserById,
        personalInfoRoutesPath.updatePersonalInfoById,
        userRelationRoutesPath.followersById,
        userRelationRoutesPath.followingById,
        userRelationRoutesPath.requestById,
        userRelationRoutesPath.deleteUserRelationAllById,
        postRoutesPath.userFeedsById,
    ],
    getIdFromBodyAsId: [
        personalInfoRoutesPath.createPersonalInfo,
    ],
    getIdFromBodyAsUserId: [
        userRelationRoutesPath.userRequestSend,
    ],
    getIdFromBodyAsOwnerId: [
        postRoutesPath.createPost,
        postRoutesPath.updatePostCaptionById,
    ],
    getIdsFromBodyAsUserIdAndFollowerId: []
}

export const getIdMethods = {
    getIdFromParamAsId: (request: Req) => {
        Log.info("Enter getIdFromParamAsId method");
        const id = request.params.id;
        Log.info("Return of getIdFromParamAsId: ", id);
        return id;
    },
    getIdFromBodyAsId: (request: Req) => {
        Log.info("Enter getIdFromBodyAsId method");
        const { id } = request.body;
        Log.info("Return of getIdFromBodyAsId: ", id);
        return id;
    },
    getIdFromBodyAsUserId: (request: Req) => {
        Log.info("Enter getIdFromBodyAsUserId method");
        const { userId } = request.body;
        Log.info("Return of getIdFromBodyAsUserId: ", userId);
        return userId;
    },
    getIdFromBodyAsOwnerId: (request: Req) => {
        Log.info("Enter getIdFromBodyAsOwnerId method");
        const { ownerId } = request.body;
        Log.info("Return of getIdFromBodyAsOwnerId: ", ownerId);
        return ownerId;
    },
    getIdsFromBodyAsUserIdAndFollowerId: (request: Req) => {
        Log.info("Enter getIdsFromBodyAsUserIdAndFollowerId method");
        const { userId, followerId } = request.body;
        Log.info("Return of getIdsFromBodyAsUserIdAndFollowerId: ", { userId, followerId });
        return { userId, followerId };
    }
}