import { Injectable } from '@angular/core';
import { ItemResponseModel } from '../models/item.model';

@Injectable()
export class ItemDataService {
  selectedItem:ItemResponseModel;  
}