export type PreferableOccupationsType = {
    occupationId:number;
    occupationName: string;
    isSelected: boolean;
};

export type PreferableOccupationsRequestType = {
    personId: string;
    occupationId: number[];
  }