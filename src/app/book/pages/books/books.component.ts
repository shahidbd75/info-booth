import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../../services/book.service';
import { MatTableDataSource } from '@angular/material/table';
import { BookResponseModel } from '../../types/book-model';
import { Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['title', 'author', 'publisher', 'language', 'price', 'quantity', 'availability', 'personName', 'actions'];
  dataSource = new MatTableDataSource<BookResponseModel>();
  isLoading = false;
  subscription$: Subscription;
  pageSize = 10;
  page = 1;
  count = 100;
  pageEvent: PageEvent;
  keyword = '';
  sortField = 'name';
  sortOrder = 'asc';
  books: BookResponseModel[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }

  loadData() {
    this.isLoading = true;
    this.subscription$ = this.bookService.getAll<BookResponseModel>().subscribe((_items: BookResponseModel[]) => {
      this.books = _items;
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
    this.sort.sortChange.subscribe((_sort: Sort) => {
      this.page = 0;
      this.sortField = _sort.active;
      this.sortOrder = _sort.direction;
    });
  }

  onEdit(model: BookResponseModel) {
    this.router.navigate([`book/book/${model.id}`]);
  }

  onDelete(element: BookResponseModel) {
    const { id } = element;
    if (confirm('Do you want to delete?') && id) {
      this.bookService.remove(id).subscribe(() => {
        this.loadData();
      });
    }
  }
}
