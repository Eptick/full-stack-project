interface PageableSort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}
interface Pageable {
  sort: PageableSort;
  pageSize: number;
  pageNumber: number;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}
export default interface Page<Type> {
    content: Array<Type>;
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    numberOfElements: number;
    sort: PageableSort;
    first: boolean;
    size: number;
    number: number;
    empty: false;
}
