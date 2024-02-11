import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { EnumTableResponseModel } from 'src/app/shared/models/enum-table-model';
import { OccupationService } from '../../services/occupation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-occupations',
  templateUrl: './occupations.component.html',
  styleUrls: ['./occupations.component.scss'],
})
export class OccupationsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'banglaName', 'actions'];
  dataSource: MatTableDataSource<EnumTableResponseModel>;
  selection = new SelectionModel<EnumTableResponseModel>(true, []);
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

  constructor(
    private occupationService: OccupationService,
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
    this.subscription$ = this.occupationService.getOccupations().subscribe(_items => {
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
    this.sort.sortChange.subscribe((_sort: Sort) => {
      this.page = 0;
      this.sortField = _sort.active;
      this.sortOrder = _sort.direction;
    });
  }

  onEdit(element: EnumTableResponseModel) {
    this.router.navigate([`personnel/occupation/${element.id}`]);
  }

  onDelete(element: EnumTableResponseModel) {
    const { id } = element;
    if (confirm('Do you want to delete?') && id) {
      this.occupationService.deleteOccupation(+id).subscribe(() => {
        this.loadData();
      });
    }
  }
}
