export interface PagedRequestModel {
    searchTerm: string | null;
    sortColumn: string | null;
    sortOrder: string | null;
    page: number;
    pageSize: number;
}