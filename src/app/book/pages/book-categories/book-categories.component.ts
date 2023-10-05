import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { BookCategoryService } from '../../services/book-category.service';
import { BookCategoryResponseModel } from '../../types/book-category-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-categories',
  templateUrl: './book-categories.component.html',
  styleUrls: ['./book-categories.component.scss']
})
export class BookCategoriesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name','banglaName','createdDate', 'actions'];
  dataSource = new MatTableDataSource<BookCategoryResponseModel>();
  isLoading = false;
  subscription$: Subscription;
  pageSize = 10;
  page = 1;
  count = 100;
  pageEvent: PageEvent;
  keyword = '';
  sortField = 'name';
  sortOrder = 'asc';
  bookCategories: BookCategoryResponseModel[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private bookCategoryService: BookCategoryService, private router: Router){}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }

  loadData() {
    this.isLoading = true;
    this.subscription$ = this.bookCategoryService.getAll<BookCategoryResponseModel>().subscribe((_items: BookCategoryResponseModel[]) => {
      this.bookCategories = _items;
      this.dataSource = new MatTableDataSource(_items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
      this.sortChange();
    });
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  onFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortChange() {
    this.sort.sortChange.subscribe((_sort: Sort)=> {
      console.log(_sort);
      this.page = 0;
      this.sortField = _sort.active;
      this.sortOrder = _sort.direction;
    });
  }

  onEdit(model: BookCategoryResponseModel) {
    this.router.navigate([`book/book-category/${model.id}`]);
  }

  onDelete(element: BookCategoryResponseModel) {
    const { id }= element;
    if(confirm('Do you want to delete?') && id) {
      this.bookCategoryService.remove(id).subscribe(()=> {
        this.loadData();
      })
    }
  }
}
