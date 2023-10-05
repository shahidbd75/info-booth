import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ItemService} from "../../services/item.service";
import {ItemResponseModel} from "../../models/item.model";
import {Subscription} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {Router} from "@angular/router";
import { ItemDataService } from '../../services/item-data.service';
import { ItemTransactionType } from '../../enums/transaction-type';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'subCategoryName', 'transactionType','postedBy', 'actions'];
  dataSource: MatTableDataSource<ItemResponseModel>;
  selection = new SelectionModel<ItemResponseModel>(true, []);
  isLoading = false;
  subscription$: Subscription;
  pageSize = 10;
  page = 0;
  count = 100;
  pageEvent: PageEvent;
  keyword = '';
  sortField = 'name';
  sortOrder = 'asc';
  transactionType = ItemTransactionType;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private itemService: ItemService, private router: Router, private itemDataService: ItemDataService) {

  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
      this.isLoading = true;
      this.subscription$ = this.itemService.getItems().subscribe(_items => {
      this.dataSource = new MatTableDataSource(_items);
      this.isLoading = false;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  onPageChange(event: any): void {
    console.log(event);
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

  ngOnDestroy(): void {
    if(this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  onEdit(item: ItemResponseModel) {
    this.itemDataService.selectedItem = item;
    this.router.navigate([`buy-sell/item/${item.name}`]);
  }

  onDelete(element: ItemResponseModel) {
    if(confirm('Do you want to remove item?') && element.id) {
      this.itemService.removeItem(element.id).subscribe(()=> {
        this.loadData();
      })
    }
    console.log('Delete:',element.name);
  }
}
