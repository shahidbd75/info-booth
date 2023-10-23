import { Component, ViewChild } from '@angular/core';
import { CommonResponseModel } from '../../types/common-response-type';
import { DesignationService } from '../../services/designation.service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.scss']
})
export class DesignationsComponent {
  displayedColumns: string[] = ['name','banglaName','createdDate', 'actions'];
  dataSource = new MatTableDataSource<CommonResponseModel>();
  isLoading = false;
  subscription$: Subscription;
  pageSize = 10;
  page = 1;
  count = 100;
  pageEvent: PageEvent;
  keyword = '';
  sortField = 'name';
  sortOrder = 'asc';
  bookCategories: CommonResponseModel[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private designationService: DesignationService, private router: Router){}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }

  loadData() {
    this.isLoading = true;
    this.subscription$ = this.designationService.getAll<CommonResponseModel>().subscribe((_items: CommonResponseModel[]) => {
      this.bookCategories = _items;
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
      console.log(_sort);
      this.page = 0;
      this.sortField = _sort.active;
      this.sortOrder = _sort.direction;
    });
  }

  onEdit(model: CommonResponseModel) {
    this.router.navigate([`cv/designation/${model.id}`]);
  }

  onDelete(element: CommonResponseModel) {
    const { id }= element;
    if(confirm('Do you want to delete?') && id) {
      this.designationService.remove(id).subscribe(()=> {
        this.loadData();
      })
    }
  }
}
