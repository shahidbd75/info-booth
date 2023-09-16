import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WorkerService } from '../../services/worker.service';
import { WorkerResponseModel } from '../../types/worker-model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['name','expectedWages','goodAt','village','upazila','district', 'actions'];
  dataSource:MatTableDataSource<WorkerResponseModel>;
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
  constructor(private workerService: WorkerService, private router: Router){}
  
  

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }

  loadData() {
    this.isLoading = true;
    this.subscription$ = this.workerService.getAll().subscribe(_items => {
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

  onEdit(worker: WorkerResponseModel) {
    //this.villageService.selectedVillage = village;
    this.router.navigate([`worker/worker/${worker.id}`]);
  }

  onDelete(element: WorkerResponseModel) {
    const { id }= element;
    if(confirm('Do you want to delete?') && id) {
      this.workerService.deleteWorker(id).subscribe(()=> {
        this.loadData();
      })
    }
  }
}
