export type LoginRequestModel = {
    userName: string;
    password: string;
};

export type LoginResponseModel = {
    token: string;
    roles: string[] | null;
}