import { GenericOptionsModel } from "src/app/shared/models/options-model";

export const bloodGroups: GenericOptionsModel<string>[] = [
    { id: 'A+', name: 'A+' },
    { id: 'A-', name: 'A-' },
    { id: 'B+', name: 'B+' },
    { id: 'B-', name: 'B-' },
    { id: 'AB+', name: 'AB+' },
    { id: 'AB-', name: 'AB-' },
    { id: 'O+', name: 'O+' },
    { id: 'O-', name: 'O-' }
];