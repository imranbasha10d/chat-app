export const userRoutesPath = {
    healthCheck: '/health-user',
    createUser: '/create-user',
    createAdminUser: '/create-admin-user',
    signIn: '/sign-in',
    userById: '/all-users',
    updatePasswordById: '/update-password/:id',
    deleteUserById: '/delete-user/:id',
}

export const personalInfoRoutesPath = {
    createPersonalInfo: '/create-personal-info',
    updatePersonalInfoById: '/update-personal-info/:id',
    personalInfoById: '/personal-info/:id'
}

export const postRoutesPath = {
    createPost: '/create-post',
    postById: '/post/:id',
    userFeedsById: '/user-feeds/:id',
    allPostsById: '/all-posts/:id',
    updatePostCaptionById: '/update-post-caption/:id',
    deletePostById: '/delete-post/:id',
    deleteAllPostsById: '/delete-all-posts/:id',
}

export const userRelationRoutesPath = {
    userRequestSend: '/user-request/send',
    userRequestAcceptById: '/user-request/accept/:id',
    followersById: '/followers/:id',
    followingById: '/following/:id',
    requestById: '/requests/:id',
    deleteUserRelation: '/delete-user-relation',
    deleteUserRelationAllById: '/delete-user-relation/all/:id',
}