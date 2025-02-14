import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-buy-list',
    templateUrl: './buy-list.component.html',
    styleUrls: ['./buy-list.component.scss'],
    standalone: false
})
export class BuyListComponent {
  dataSource = new MatTableDataSource<{ id: number; name: string }>([
    { id: 1, name: 'shahid' },
    { id: 2, name: 'Jahan' },
    { id: 3, name: 'Max' },
  ]);
}
