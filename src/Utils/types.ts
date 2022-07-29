export enum UserRoles {
  admin = 'Admin',
  user = 'User'
};

export interface User {
  username: string,
  email: string,
  password: string,
  role: UserRoles,
}

export interface UserPassword {
  password: string,
}

export enum Gender {
  male = 'Male',
  female = 'Female',
  others = 'Others'
};

export enum Status {
  single = 'Single',
  inRelationship = 'In Relationship',
  notInterested = 'Not Interested'
};

export interface PersonalInfo {
  id: string,
  fullName: string,
  dob: string,
  gender: Gender,
  status: Status
}

export interface UpdatePersonalInfo {
  fullName: string,
  status: Status
}

export interface MediaUrl {
  url: string,
  type: string
}

export interface Post {
  caption: string,
  mediaUrl: MediaUrl,
  ownerId: string
}

export enum RelationType {
  requested = 'Requested',
  following = 'Following'
};

export interface UserRelation {
  userId: string,
  followerId: string,
  type: RelationType
}

export interface UserRelationIds {
  userId: string,
  followerId: string
}

export interface ResponseType {
  success: boolean,
  statusCode: number,
  data: any,
  message: string
}