import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {ItemService} from "../../services/item.service";
import {ItemResponseModel} from "../../models/item.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['name', 'shortDescription', 'subCategoryName', 'condition'];
  dataSource: MatTableDataSource<ItemResponseModel>;
  isLoading = false;
  subscription$: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private itemService: ItemService) {

  }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    console.log('Hello')
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    const subscription$ = this.itemService.getItems().subscribe(_items => {
      this.dataSource = new MatTableDataSource(_items);
      this.isLoading = false;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    if(this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
