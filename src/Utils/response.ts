import { statusCode } from "./statusCodes";
import { ResponseType } from "./types";
export const RESPONSE_MEESAGE = {
  USER_DELETED_SUCCESSFULLY: "User deleted successfully",
  FAILED_TO_DELETE_USER: "Failed to delete user",
  FAILED_TO_DELETE_USER_RELATION: "Failed to delete user relation",
  POSTS_DELETED_SUCCESSFULLY: "Posts deleted successfully",
  POST_DELETED_SUCCESSFULLY: "Post deleted successfully",
  FAILED_TO_UPDATE_POST: "Failed to update post",
  FAILED_TO_CREATE_POST: "Failed to create post",
  FAILED_TO_DELETE_POST: "Failed to delete post",
  FAILED_TO_DELETE_POSTS: "Failed to delete posts",
  USER_RELATION_DELETED_SUCCESSFULLY: "User relation deleted successfully",
  PERSONAL_INFO_NOT_FOUND: "Personal info not found",
  PERSONAL_INFO_ALREADY_EXISTED: "Personal info already existed",
  PERSONAL_INFO_DELETED_SUCCESSFULLY: "Personal info deleted successfully",
  FAILED_TO_CREATE_PERSONAL_INFO: "Failed to create personal info",
  FAILED_TO_DELETE_PERSONAL_INFO: "Failed to delete personal info",
  USER_NOT_FOUND: "User not found",
  POST_NOT_FOUND: "Post not found",
  PASSWORD_INCORRECT: "Password incorrect",
  USER_ALREADY_EXISTED: "User already existed",
  REQUEST_ALREADY_SENT: "Request already sent",
  REQUEST_NOT_FOUND: "Request not found",
  USER_CURRENTLY_FOLLOWING_THIS_ACCOUNT: "User currently following this account",
  FAILED_TO_CREATE_REQUEST: "Failed to create request",
  FAILED_TO_ACCEPT_REQUEST: "Failed to accept request",
  USER_RELATION_NOT_FOUNT: "User relation not found",
  AUTH_HEADER_NOT_FOUND: "Auth header not found",
  AUTH_TOKEN_NOT_FOUND: "Auth token not found",
  INVALID_AUTH_TOKEN: "Invalid auth token",
  UNAUTHORIZED_ACCESS: "Unauthorized access",
}

export class Response {
  public static success(data: any): ResponseType {
    return {
      success: true,
      statusCode: statusCode.success,
      data: data,
      message: 'Success'
    };
  }
  public static userNotFound(): ResponseType {
    return {
      success: false,
      statusCode: statusCode.fileNotFound,
      data: null,
      message: 'User not found',
    };
  }
  public static infoNotFound(): ResponseType {
    return {
      success: false,
      statusCode: statusCode.fileNotFound,
      data: null,
      message: 'Personal info not found',
    };
  }
  public static notFound(message: string): ResponseType {
    return {
      success: false,
      statusCode: statusCode.fileNotFound,
      data: null,
      message: message,
    };
  }
  public static fileNotFound(): ResponseType {
    return {
      success: false,
      statusCode: statusCode.fileNotFound,
      data: null,
      message: 'File not found',
    };
  }
  public static internalServerError(): ResponseType {
    return {
      success: false,
      statusCode: statusCode.internalServerError,
      data: null,
      message: "Internal server error",
    };
  }

  public static badRequest(message: string): ResponseType {
    return {
      success: false,
      statusCode: statusCode.badRequest,
      data: null,
      message: message,
    };
  };

}