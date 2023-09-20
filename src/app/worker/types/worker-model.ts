import { OptionsModel } from "src/app/shared/models/options-model";

export type WorkerResponseModel = {
    id:               string;
    teamLeaderName:   string;
    teamLeaderMobile: string;
    totalTeamMember:  number;
    expectedWages:    number;
    startTime:        null;
    endTime:          null;
    isNegotiable:     boolean;
    detail:           string;
    workerName:       string;
    goodAts:          OptionsModel[];
    workGroups:       OptionsModel[];
    workAbilities:    OptionsModel[];
    preferableDays:   OptionsModel[];
    village:          string;
    upazila:          string;
    district:         string;
    isActive:         boolean;
};

export type WorkerTableModel = {
    id:               string;
    name:             string;
    village:          string;
    upazila:          string;
    district:         string;
    isActive:         boolean;
    goodAts:          string;
    workGroups:       string;
    workAbilities:    string;
    preferableDays:   string;
    expectedWages:    number;
}

export type WorkerRequestModel = {
    teamLeaderName:   string;
    teamLeaderMobile: string;
    totalTeamMember:  number;
    expectedWages:    number;
    startTime:        string;
    endTime:          string;
    isNegotiable:     boolean;
    detail:           string;
    goodAts:          number[];
    workGroups:       number[];
    workAbilities:    number[];
    perferableDays:   number[];
    isActive:         boolean;
    personId:         string;
};