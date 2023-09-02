import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { PersonResponseModel } from '../../types/person.model';
import { Router } from '@angular/router';
import { PersonClientService } from '../../services/person-client.service';
import { Gender } from '../../enums/gender.enum';
import { PersonDataService } from '../../services/person-data.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['name', 'phone', 'gender', 'address', 'actions'];
  dataSource = new MatTableDataSource<PersonResponseModel>();
  selection = new SelectionModel<PersonResponseModel>(true, []);
  isLoading = false;
  subscription$: Subscription;
  pageSize = 10;
  page = 0;
  count = 100;
  pageEvent: PageEvent;
  keyword = '';
  sortField = 'name';
  sortOrder = 'asc';
  gender = Gender;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private personService: PersonClientService, private router: Router, private dataService: PersonDataService) {

  }

  
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.subscription$ = this.personService.getAllPersons().subscribe(_items => {
      this.dataSource = new MatTableDataSource(_items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
      this.sortChange();
    });
  }
  onFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onPageChange(event: any): void {
    console.log(event);
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  sortChange() {
    this.sort.sortChange.subscribe((_sort: Sort)=> {
      this.page = 0;
      this.sortField = _sort.active;
      this.sortOrder = _sort.direction;
    });
  }

  ngOnDestroy(): void {
    if(this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  onEdit(element: PersonResponseModel) {
    this.dataService.selectedPerson$.next(element)
    this.router.navigate([`personnel/person`]);
  }

  onDelete(element: PersonResponseModel) {
    const {id} = element;
    if(confirm('Do you want to delete?') && id) {
      this.personService.deletePerson(id).subscribe(()=> {
        this.loadData();
      })
    }
  }
}
