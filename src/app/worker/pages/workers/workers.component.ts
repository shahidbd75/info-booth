import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WorkerService } from '../../services/worker.service';
import { WorkerResponseModel, WorkerTableModel } from '../../types/worker-model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { OptionsModel } from 'src/app/shared/models/options-model';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['name','phone','occupation', 'village','expectedWages','goodAts','actions'];
  dataSource:MatTableDataSource<WorkerTableModel>;
  isLoading = false;
  subscription$: Subscription;
  pageSize = 10;
  page = 0;
  count = 100;
  pageEvent: PageEvent;
  keyword = '';
  sortField = 'name';
  sortOrder = 'asc';
  workers: WorkerResponseModel[];
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
    this.subscription$ = this.workerService.getAll().subscribe((_items: WorkerResponseModel[]) => {
      this.workers = _items;
      this.dataSource = new MatTableDataSource(_items.map((_item:WorkerResponseModel) => {
        return {
          id: _item.id,
          name: _item.workerName,
          phone: _item.workerPhone,
          expectedWages: _item.expectedWages,
          isActive: _item.isActive,
          village: _item.village,
          occupation: _item.occupation,
          goodAts: _item.goodAts?.map(g=>g.name).join(','),
          preferableDays: _item.preferableDays?.map(g=>g.name).join(','),
          workAbilities: _item.workAbilities?.map(g=>g.name).join(','),
          workGroups: _item.workGroups?.map(g=>g.name).join(','),
        }
      }));
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
      console.log(_sort);
      this.page = 0;
      this.sortField = _sort.active;
      this.sortOrder = _sort.direction;
    });
  }

  onEdit(worker: WorkerTableModel) {
    this.workerService.selectedWorker = this.workers.find(x=>x.id === worker.id) ?? null;
    this.router.navigate([`worker/worker`]);
  }

  onDelete(element: WorkerTableModel) {
    const { id }= element;
    if(confirm('Do you want to delete?') && id) {
      this.workerService.deleteWorker(id).subscribe(()=> {
        this.loadData();
      })
    }
  }

  optionsToName(options: OptionsModel[]) : string {
    return options.map((op: OptionsModel) => op.name).join(', ');
  }
}