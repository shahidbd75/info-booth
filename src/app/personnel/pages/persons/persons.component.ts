import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, debounceTime, map, merge } from 'rxjs';
import { PersonResponseModel } from '../../types/person.model';
import { Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Gender } from '../../enums/gender.enum';
import { PagedRequestModel } from 'src/app/shared/models/paged-request-model';
import { PagedResponseModel } from 'src/app/shared/models/paged-list-response';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss'],
})
export class PersonsComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['name', 'phone', 'gender', 'degreeName', 'address', 'actions'];
  dataSource = new MatTableDataSource<PersonResponseModel>();
  selection = new SelectionModel<PersonResponseModel>(true, []);
  isLoading = false;
  subscription$: Subscription;
  pageSize = 10;
  page = 1;
  count = 100;
  pageEvent: PageEvent;
  sortField = 'name';
  sortOrder = 'asc';
  gender = Gender;
  searchControl = new FormControl('');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private personService: PersonService,
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
    this.subscription$ = this.personService.search(requestModel).subscribe((response: PagedResponseModel<PersonResponseModel>) => {
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

  onEdit(element: PersonResponseModel) {
    this.router.navigate([`personnel/person`, element.id]);
  }

  onDelete(element: PersonResponseModel) {
    const { id } = element;
    if (confirm('Do you want to delete?') && id) {
      this.personService.deletePerson(id).subscribe(() => {
        this.load();
      });
    }
  }
}
