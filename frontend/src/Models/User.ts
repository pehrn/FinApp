export type UserProfileToken = {
    userName: string;
    email: string;
    token: string;
};

export type UserProfile = {
    userName: string;
    email: string;
};

export type User = {
    userName: string;
    email: string;
    portfolio: any;
    comments: any;
    aboutMe: string;
    position: string;
}

export type EditUser = {
    userName: string;
    aboutMe: string;
    position: string;
}