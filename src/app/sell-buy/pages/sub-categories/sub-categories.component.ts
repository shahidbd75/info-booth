import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SubCategoryService } from '../../services/sub-category.service';
import { MatTableDataSource } from '@angular/material/table';
import { SubCategoryResponse } from '../../models/sub-category.model';
import { Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss'],
})
export class SubCategoriesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'categoryName', 'actions'];
  dataSource = new MatTableDataSource<SubCategoryResponse>();
  isLoading = false;
  subscription$: Subscription;
  pageSize = 10;
  page = 1;
  count = 100;
  pageEvent: PageEvent;
  keyword = '';
  sortField = 'name';
  sortOrder = 'asc';
  bookCategories: SubCategoryResponse[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private subCategoriesService: SubCategoryService,
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
    this.subscription$ = this.subCategoriesService.getAllSubCategories().subscribe((_items: SubCategoryResponse[]) => {
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
    this.sort.sortChange.subscribe((_sort: Sort) => {
      this.page = 0;
      this.sortField = _sort.active;
      this.sortOrder = _sort.direction;
    });
  }

  onEdit(model: SubCategoryResponse) {
    this.router.navigate([`buy-sell/sub-category/${model.id}`]);
  }

  onDelete(element: SubCategoryResponse) {
    const { id } = element;
    if (confirm('Do you want to delete?') && id) {
      this.subCategoriesService.removeSubcategory(id).subscribe(() => {
        this.loadData();
      });
    }
  }
}
