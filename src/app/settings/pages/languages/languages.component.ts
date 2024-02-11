import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LanguageResponseModel } from '../../types/language.types';
import { Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LanguageService } from '../../services/language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'createdDate', 'actions'];
  dataSource = new MatTableDataSource<LanguageResponseModel>();
  isLoading = false;
  subscription$: Subscription;
  pageSize = 10;
  page = 1;
  count = 100;
  pageEvent: PageEvent;
  keyword = '';
  sortField = 'name';
  sortOrder = 'asc';
  bookCategories: LanguageResponseModel[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private languageService: LanguageService,
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
    this.subscription$ = this.languageService.getAll<LanguageResponseModel>().subscribe((_items: LanguageResponseModel[]) => {
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
      console.log(_sort);
      this.page = 0;
      this.sortField = _sort.active;
      this.sortOrder = _sort.direction;
    });
  }

  onEdit(model: LanguageResponseModel) {
    this.router.navigate([`settings/language/${model.id}`]);
  }

  onDelete(element: LanguageResponseModel) {
    const { id } = element;
    if (confirm('Do you want to delete?') && id) {
      this.languageService.remove(id).subscribe(() => {
        this.loadData();
      });
    }
  }
}
