import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { VillageService } from '../../services/village.service';
import { Router } from '@angular/router';
import { VillageListResponseModel } from '../../types/village.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-villages',
  templateUrl: './villages.component.html',
  styleUrls: ['./villages.component.scss']
})
export class VillagesComponent {
  displayedColumns: string[] = ['villageName','banglaName','upazilaName','districtName', 'actions'];
  dataSource:MatTableDataSource<VillageListResponseModel>;
  selection = new SelectionModel<VillageListResponseModel>(true, []);
  isLoading = false;
  subscription$: Subscription;
  pageSize = 10;
  page = 0;
  count = 100;
  pageEvent: PageEvent;
  keyword = '';
  sortField = 'name';
  sortOrder = 'asc';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private villageService: VillageService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadData();
    
  }

  ngOnDestroy(): void {
      this.subscription$?.unsubscribe();
  }

  loadData() {
    this.isLoading = true;
    this.subscription$ = this.villageService.getVillages().subscribe(_items => {
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

  onPageChange(event: PageEvent): void {
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

  onEdit(element: VillageListResponseModel) {
    this.router.navigate([`personnel/occupation/${element.villageId}`]);
  }

  onDelete(element: VillageListResponseModel) {
    const { villageId: id }= element;
    if(confirm('Do you want to delete?') && id) {
      this.villageService.deleteVillage(+id).subscribe(()=> {
        this.loadData();
      })
    }
  }
}
