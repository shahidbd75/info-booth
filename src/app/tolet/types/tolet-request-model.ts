export type ToLetRequestModel = {
    title: string;
};

export type ToLetCreateRequestModel = ToLetRequestModel;

export type ToLetUpdateRequestModel = {
    id: string;
} & ToLetRequestModel;