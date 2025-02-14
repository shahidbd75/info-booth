import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, map, merge, Subscription } from 'rxjs';
import { PagedResponseModel } from 'src/app/shared/models/paged-list-response';
import { SpecializationResponseModel } from '../../types/specialization-model';
import { SpecializationClientService } from '../../services/specialization-client.service';
import { PagedRequestModel } from 'src/app/shared/models/paged-request-model';

@Component({
    selector: 'app-specializations',
    templateUrl: './specializations.component.html',
    styleUrl: './specializations.component.scss',
    standalone: false
})
export class SpecializationsComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['name', 'banglaName', 'actions'];
  dataSource = new MatTableDataSource<SpecializationResponseModel>();
  selection = new SelectionModel<SpecializationResponseModel>(true, []);
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
    private specializationService: SpecializationClientService,
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
    this.subscription$ = this.specializationService.search<PagedRequestModel, SpecializationResponseModel>(requestModel)
    .subscribe((response: PagedResponseModel<SpecializationResponseModel>) => {
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

  onEdit(element: SpecializationResponseModel) {
    this.specializationService.selectedItem = element;
    this.router.navigate([`health/specialization`]);
  }

  onDelete(element: SpecializationResponseModel) {
    const { id } = element;
    if (confirm('Do you want to delete?') && id) {
      this.specializationService.remove(id).subscribe(() => {
        this.load();
      });
    }
  }
}
