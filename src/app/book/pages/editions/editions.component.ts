import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EditionResponseModel } from '../../types/edition-model';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { EditionService } from '../../services/edition.service';

@Component({
  selector: 'app-editions',
  templateUrl: './editions.component.html',
  styleUrls: ['./editions.component.scss']
})
export class EditionsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name','createdDate', 'actions'];
  dataSource = new MatTableDataSource<EditionResponseModel>();
  isLoading = false;
  subscription$: Subscription;
  pageSize = 10;
  page = 1;
  count = 100;
  pageEvent: PageEvent;
  keyword = '';
  sortField = 'name';
  sortOrder = 'asc';
  bookCategories: EditionResponseModel[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private editionService: EditionService, private router: Router){}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }

  loadData() {
    this.isLoading = true;
    this.subscription$ = this.editionService.getAll<EditionResponseModel>().subscribe((_items: EditionResponseModel[]) => {
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

  onEdit(model: EditionResponseModel) {
    this.router.navigate([`book/edition/${model.id}`]);
  }

  onDelete(element: EditionResponseModel) {
    const { id }= element;
    if(confirm('Do you want to delete?') && id) {
      this.editionService.remove(id).subscribe(()=> {
        this.loadData();
      })
    }
  }
}
