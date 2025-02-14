import { PagedResponseModel } from './../../../shared/models/paged-list-response';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DoctorsClientService } from '../../services/doctors-client.service';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorsResponseModel, DoctorsType } from '../../types/doctors-types';
import { SelectionModel } from '@angular/cdk/collections';
import { debounceTime, map, merge, Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { PagedRequestModel } from 'src/app/shared/models/paged-request-model';

@Component({
    selector: 'app-doctors',
    templateUrl: './doctors.component.html',
    styleUrl: './doctors.component.scss',
    standalone: false
})
export class DoctorsComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['name', 'degrees','bmdcRegNo','doctorsType', 'actions'];
  dataSource = new MatTableDataSource<DoctorsResponseModel>();
  selection = new SelectionModel<DoctorsResponseModel>(true, []);
  isLoading = false;
  subscription$: Subscription;
  pageSize = 10;
  page = 1;
  count = 100;
  pageEvent: PageEvent;
  sortField = 'name';
  sortOrder = 'asc';
  searchControl = new FormControl('');
  doctorsType = DoctorsType;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private doctorsService: DoctorsClientService,
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
    this.subscription$ = this.doctorsService.search<PagedRequestModel, DoctorsResponseModel>(requestModel)
    .subscribe((response: PagedResponseModel<DoctorsResponseModel>) => {
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

  onEdit(element: DoctorsResponseModel) {
    this.router.navigate([`health/doctor`, element.id]);
  }

  onDelete(element: DoctorsResponseModel) {
    const { id } = element;
    if (confirm('Do you want to delete?') && id) {
      this.doctorsService.remove(id).subscribe(() => {
        this.load();
      });
    }
  }
}