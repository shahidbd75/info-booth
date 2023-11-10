export type TrainingResponseTypes = {
    id:	         string;
    personId:	 string;
    topic?:	     string;
    organization?:string;
    startDate:   Date;
    endDate:     Date;
    duration?:   string;
    isActive:	 boolean;
    createdDate: Date;
};

export type TrainingCreateRequestTypes = {
    personId:	 string;
    topic:	     string;
    organization:string | null;
    startDate?:  Date | null;
    endDate?:    Date | null;
    duration?:   string;
};

export type TrainingUpdateRequestTypes =  TrainingCreateRequestTypes & {
    id:	         string;
};