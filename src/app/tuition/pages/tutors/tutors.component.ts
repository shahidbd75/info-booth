import { PagedResponseModel } from './../../../shared/models/paged-list-response';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TutorResponseModel } from '../../types/tutor.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription, debounceTime, map, merge } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { PagedRequestModel } from 'src/app/shared/models/paged-request-model';
import { Router } from '@angular/router';
import { TutorService } from '../../services/tutor.service';

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.scss'],
})
export class TutorsComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['name', 'degree', 'subject', 'institute', 'experience', 'actions'];
  dataSource = new MatTableDataSource<TutorResponseModel>();
  selection = new SelectionModel<TutorResponseModel>(true, []);
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
    private tutorService: TutorService,
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
    this.subscription$ = this.tutorService.search(requestModel).subscribe((response: PagedResponseModel<TutorResponseModel>) => {
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

  onEdit(element: TutorResponseModel) {
    this.tutorService.selectedTutor = element;
    this.router.navigate([`tuition/tutor`]);
  }

  onDelete(element: TutorResponseModel) {
    const { id } = element;
    if (confirm('Do you want to delete?') && id) {
      this.tutorService.deleteTutor(id).subscribe(() => {
        this.load();
      });
    }
  }
}
