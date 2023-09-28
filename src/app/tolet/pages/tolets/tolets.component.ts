import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ToletService } from '../../services/tolet.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToLetTableResponseModel } from '../../types/tolet-response-model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tolets',
  templateUrl: './tolets.component.html',
  styleUrls: ['./tolets.component.scss']
})
export class ToletsComponent {
  displayedColumns: string[] = ['village','title', 'rent', 'availableFrom','accomodation','rentType','area', 'postedBy','isActive', 'actions'];
  dataSource = new MatTableDataSource<ToLetTableResponseModel>();
  isLoading = false;
  subscription$: Subscription;
  pageSize = 10;
  page = 1;
  count = 100;
  pageEvent: PageEvent;
  keyword = '';
  sortField = 'name';
  sortOrder = 'asc';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private toletService: ToletService, private router: Router) {

  }

  loadData() {}

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

  onEdit(tolet: ToLetTableResponseModel) {
    this.router.navigate([`tolet/to-let/${tolet.id}`]);
  }

  onDelete(element: ToLetTableResponseModel) {
    const { id }= element;
    if(confirm('Do you want to delete?') && id) {
      this.toletService.removeToLetById(id).subscribe(()=> {
        this.loadData();
      })
    }
  }
}
