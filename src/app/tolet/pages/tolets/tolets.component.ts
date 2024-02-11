import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ToletService } from '../../services/tolet.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToLetTableResponseModel } from '../../types/tolet-response-model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tolets',
  templateUrl: './tolets.component.html',
  styleUrls: ['./tolets.component.scss'],
})
export class ToletsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['village', 'title', 'rent', 'availableFrom', 'accomodation', 'rentType', 'area', 'postedBy', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<ToLetTableResponseModel>();
  isLoading = false;
  subscription$: Subscription;
  pageSize = 10;
  page = 1;
  count = 100;
  pageEvent: PageEvent;
  keyword = '';
  sortField = 'name';
  sortOrder = 'asc';
  toLets: ToLetTableResponseModel[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private toletService: ToletService,
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
    this.subscription$ = this.toletService.getToLets().subscribe((_items: ToLetTableResponseModel[]) => {
      this.toLets = _items;
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

  onEdit(tolet: ToLetTableResponseModel) {
    this.router.navigate([`tolet/to-let/${tolet.id}`]);
  }

  onDelete(element: ToLetTableResponseModel) {
    const { id } = element;
    if (confirm('Do you want to delete?') && id) {
      this.toletService.removeToLetById(id).subscribe(() => {
        this.loadData();
      });
    }
  }
}
