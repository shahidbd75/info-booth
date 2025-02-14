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
import { HealthAmenityResponseModel } from '../../types/health-amenities.types';
import { HealthAmenitiesService } from '../../services/health-amenities.service';
import { HealthRoutePath } from '../../constant/health-route-path';


@Component({
    selector: 'app-amenities',
    templateUrl: './amenities.component.html',
    styleUrl: './amenities.component.scss',
    standalone: false
})
export class AmenitiesComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['name', 'banglaName', 'actions'];
  dataSource = new MatTableDataSource<HealthAmenityResponseModel>();
  selection = new SelectionModel<HealthAmenityResponseModel>(true, []);
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
    private amenitiesService: HealthAmenitiesService,
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
    this.subscription$ = this.amenitiesService.search<PagedRequestModel, HealthAmenityResponseModel>(requestModel)
    .subscribe((response: PagedResponseModel<HealthAmenityResponseModel>) => {
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

  onEdit(element: HealthAmenityResponseModel) {
    this.amenitiesService.selectedItem = element;
    this.router.navigate([`health/${HealthRoutePath.Amenity}`, element.id]);
  }

  onDelete(element: HealthAmenityResponseModel) {
    const { id } = element;
    if (confirm('Do you want to delete?') && id) {
      this.amenitiesService.remove(id).subscribe(() => {
        this.load();
      });
    }
  }
}
