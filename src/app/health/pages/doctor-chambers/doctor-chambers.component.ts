import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DoctorChambersClientService } from '../../services/doctor-chambers-client.service';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription, merge, debounceTime, map } from 'rxjs';
import { PagedResponseModel } from 'src/app/shared/models/paged-list-response';
import { PagedRequestModel } from 'src/app/shared/models/paged-request-model';
import { DoctorsChambersSummeryResponseModel } from '../../types/doctors-chambers.types';
import { HealthRoutePath } from '../../constant/health-route-path';

@Component({
  selector: 'app-doctor-chambers',
  standalone: false,
  templateUrl: './doctor-chambers.component.html',
  styleUrl: './doctor-chambers.component.scss'
})
export class DoctorChambersComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['doctorName', 'hospitalName','firstTimeVisitFees','hospitalLocation','phoneForSerial1','visitOnline', 'actions'];
  dataSource = new MatTableDataSource<DoctorsChambersSummeryResponseModel>();
  selection = new SelectionModel<DoctorsChambersSummeryResponseModel>(true, []);
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
    private doctorChambersService: DoctorChambersClientService,
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
    this.subscription$ = this.doctorChambersService.search<PagedRequestModel, DoctorsChambersSummeryResponseModel>(requestModel)
    .subscribe((response: PagedResponseModel<DoctorsChambersSummeryResponseModel>) => {
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

  onEdit(element: DoctorsChambersSummeryResponseModel) {
    this.router.navigate([`health/${HealthRoutePath.DoctorChamber}`, element.id]);
  }

  onDelete(element: DoctorsChambersSummeryResponseModel) {
    const { id } = element;
    if (confirm('Do you want to delete?') && id) {
      this.doctorChambersService.remove(id).subscribe(() => {
        this.load();
      });
    }
  }
}
