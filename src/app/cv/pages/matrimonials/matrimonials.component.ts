import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatrimonialBasicCvService } from '../../services/matrimonial-basic.service';
import { MatrimonialReponseType, MatrimonialTableResponse } from '../../types/matrimonial-basic-types';

@Component({
  selector: 'app-matrimonials',
  templateUrl: './matrimonials.component.html',
  styleUrls: ['./matrimonials.component.scss']
})
export class MatrimonialsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name','phone','villageName','percentComplete','createdDate', 'actions'];
  dataSource = new MatTableDataSource<MatrimonialTableResponse>();
  isLoading = false;
  subscription$: Subscription;
  pageSize = 10;
  page = 1;
  count = 100;
  pageEvent: PageEvent;
  keyword = '';
  sortField = 'name';
  sortOrder = 'asc';
  cvList: MatrimonialTableResponse[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private matrimonialBasicService: MatrimonialBasicCvService, private router: Router){}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }

  loadData() {
    this.isLoading = true;
    this.subscription$ = this.matrimonialBasicService.getSummeries()
    .subscribe((_items: MatrimonialTableResponse[]) => {
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

  onEdit(model: MatrimonialTableResponse) {
    this.router.navigate([`cv/matrimonial/${model.id}`]);
  }

  onDelete(element: MatrimonialTableResponse) {
    const { id }= element;
    if(confirm('Do you want to delete?') && id) {
      this.matrimonialBasicService.remove(id).subscribe(()=> {
        this.loadData();
      })
    }
  }
}
