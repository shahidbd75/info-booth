import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription, merge, debounceTime, map } from 'rxjs';
import { PagedResponseModel } from 'src/app/shared/models/paged-list-response';
import { PagedRequestModel } from 'src/app/shared/models/paged-request-model';
import { HospitalsSummeryResponseModel } from '../../types/hospitals-types';
import { HospitalsClientService } from '../../services/hospitals-client.service';

@Component({
  selector: 'app-hospitals',
  standalone: false,
  templateUrl: './hospitals.component.html',
  styleUrl: './hospitals.component.scss'
})
export class HospitalsComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['name', 'banglaName','healthCareType','totalDoctor','village', 'actions'];
  dataSource = new MatTableDataSource<HospitalsSummeryResponseModel>();
  selection = new SelectionModel<HospitalsSummeryResponseModel>(true, []);
  isLoading = false;
  subscription$: Subscription;
  pageSize = 10;
  page = 1;
  count = 100;
  pageEvent: PageEvent;
  sortField = 'name';
  sortOrder = 'asc';
  searchControl = new FormControl('');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private hospitalsService: HospitalsClientService,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.subscription$ = merge(
      this.paginator.page,
      this.sort.sortChange,
      this.searchControl.valueChanges.pipe(
        debounceTime(500),
        map(f => f?.trim())
      )
    ).subscribe({
      next: () => {
        this.load();
      },
    });
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.isLoading = true;
    this.page = this.paginator?.pageIndex > 0 ? this.paginator?.pageIndex : this.page;
    this.pageSize = this.paginator?.pageSize ?? this.pageSize;
    this.sortField = this.sort?.active ?? this.sortField;
    this.sortOrder = this.sort?.direction ?? this.sortOrder;

    const requestModel: PagedRequestModel = {
      page: this.page,
      pageSize: this.pageSize,
      searchTerm: this.searchControl.value,
      sortColumn: this.sortField,
      sortOrder: this.sortOrder,
    };
    this.subscription$ = this.hospitalsService.search<PagedRequestModel, HospitalsSummeryResponseModel>(requestModel)
    .subscribe((response: PagedResponseModel<HospitalsSummeryResponseModel>) => {
      this.dataSource = new MatTableDataSource(response.items);
      this.count = response.totalCount;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  onEdit(element: HospitalsSummeryResponseModel) {
    this.router.navigate([`health/hospital`, element.id]);
  }

  onDelete(element: HospitalsSummeryResponseModel) {
    const { id } = element;
    if (confirm('Do you want to delete?') && id) {
      this.hospitalsService.remove(id).subscribe(() => {
        this.load();
      });
    }
  }
}
