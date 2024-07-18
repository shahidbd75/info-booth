import { TutionPostResponseModel } from './../../types/tuition-post';
import { PagedRequestModel } from 'src/app/shared/models/paged-request-model';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription, debounceTime, map, merge } from 'rxjs';
import { PagedResponseModel } from 'src/app/shared/models/paged-list-response';
import { SelectionModel } from '@angular/cdk/collections';
import { TuitionPostService } from '../../services/tuition-post.service';

@Component({
  selector: 'app-tution-posts',
  templateUrl: './tution-posts.component.html',
  styleUrls: ['./tution-posts.component.scss'],
})
export class TutionPostsComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['title', 'tutorName', 'salary', 'isNegotiable', 'medium', 'preferableGender', 'actions'];
  dataSource = new MatTableDataSource<TutionPostResponseModel>();
  selection = new SelectionModel<TutionPostResponseModel>(true, []);
  isLoading = false;
  subscription$: Subscription;
  pageSize = 10;
  page = 1;
  count = 100;
  pageEvent: PageEvent;
  sortField = 'title';
  sortOrder = 'asc';
  searchControl = new FormControl('');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private tuitionPostService: TuitionPostService,
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
    this.subscription$ = this.tuitionPostService.search(requestModel).subscribe((response: PagedResponseModel<TutionPostResponseModel>) => {
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

  onEdit(element: TutionPostResponseModel) {
    this.tuitionPostService.selectedTuition = element;
    this.router.navigate([`tuition/tutor`]);
  }

  onDelete(element: TutionPostResponseModel) {
    const { tutorId } = element;
    if (confirm('Do you want to delete?') && tutorId) {
      this.tuitionPostService.deleteTuitionPost(tutorId).subscribe(() => {
        this.load();
      });
    }
  }
}
