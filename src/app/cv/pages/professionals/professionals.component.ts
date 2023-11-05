import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfessionalTableResponseModel } from '../../types/professional-basic-types';
import { ProfessionalBasicService } from '../../services/professional-basic.service';

@Component({
  selector: 'app-professionals',
  templateUrl: './professionals.component.html',
  styleUrls: ['./professionals.component.scss']
})
export class ProfessionalsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name','phone','villageName','percentComplete','createdDate', 'actions'];
  dataSource = new MatTableDataSource<ProfessionalTableResponseModel>();
  isLoading = false;
  subscription$: Subscription;
  pageSize = 10;
  page = 1;
  count = 100;
  pageEvent: PageEvent;
  keyword = '';
  sortField = 'name';
  sortOrder = 'asc';
  cvList: ProfessionalTableResponseModel[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private professionalCvService: ProfessionalBasicService, private router: Router){}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }

  loadData() {
    this.isLoading = true;
    this.subscription$ = this.professionalCvService.getAll<ProfessionalTableResponseModel>().subscribe((_items: ProfessionalTableResponseModel[]) => {
      this.cvList = _items;
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
    this.sort.sortChange.subscribe((_sort: Sort)=> {
      this.page = 0;
      this.sortField = _sort.active;
      this.sortOrder = _sort.direction;
    });
  }

  onEdit(model: ProfessionalTableResponseModel) {
    this.router.navigate([`cv/professional/${model.personId}`]);
  }

  onDelete(element: ProfessionalTableResponseModel) {
    const { personId }= element;
    if(confirm('Do you want to delete?') && personId) {
      this.professionalCvService.remove(personId).subscribe(()=> {
        this.loadData();
      })
    }
  }
}
