export type PagedResponseModel<T> =  {
    items:       T[];
    totalCount:  number;
    pageSize:    number;
    currentPage: number;
    totalPages:  number;
}