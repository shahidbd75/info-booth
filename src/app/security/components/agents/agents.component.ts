import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AgentResponseModel } from '../../types/agent-model';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { AgentService } from '../../services/agent.service';

@Component({
    selector: 'app-agents',
    templateUrl: './agents.component.html',
    styleUrls: ['./agents.component.scss'],
    standalone: false
})
export class AgentsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'phone', 'district', 'upazila', 'createdDate', 'actions'];
  dataSource = new MatTableDataSource<AgentResponseModel>();
  isLoading = false;
  subscription$: Subscription;
  pageSize = 10;
  page = 1;
  count = 100;
  pageEvent: PageEvent;
  keyword = '';
  sortField = 'name';
  sortOrder = 'asc';
  agents: AgentResponseModel[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private agentService: AgentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }

  loadData() {
    this.isLoading = true;
    this.subscription$ = this.agentService.getAll<AgentResponseModel>().subscribe((_items: AgentResponseModel[]) => {
      this.agents = _items;
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
    this.sort.sortChange.subscribe((_sort: Sort) => {
      console.log(_sort);
      this.page = 0;
      this.sortField = _sort.active;
      this.sortOrder = _sort.direction;
    });
  }

  onEdit(agent: AgentResponseModel) {
    this.router.navigate([`user/agent/${agent.id}`]);
  }

  onDelete(element: AgentResponseModel) {
    const { id } = element;
    if (confirm('Do you want to delete?') && id) {
      this.agentService.remove(id).subscribe(() => {
        this.loadData();
      });
    }
  }
}
