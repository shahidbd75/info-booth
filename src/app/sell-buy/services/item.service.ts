import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ItemRequestModel, ItemResponseModel} from "../models/item.model";
import {API_ENDPOINT_CONST} from "../../shared/constants/endpoints";
import {Observable} from "rxjs";

@Injectable()
export class ItemService {

  constructor(private httpClient: HttpClient) { }

  addItem(requestModel: ItemRequestModel): Observable<any> {
    return this.httpClient.post(API_ENDPOINT_CONST.BUY_SELL.ITEM_BASE, requestModel);
  }

  updateItem(requestModel: ItemRequestModel): void {
    this.httpClient.put(API_ENDPOINT_CONST.BUY_SELL.ITEM_BASE, requestModel);
  }

  removeItem(id: string): void {
    this.httpClient.delete(`${API_ENDPOINT_CONST.BUY_SELL.ITEM_BASE}/${id}`);
  }

  getItems(): Observable<Array<ItemResponseModel>> {
    return this.httpClient.get<Array<ItemResponseModel>>(`${API_ENDPOINT_CONST.BUY_SELL.ITEM_BASE}`);
  }
}
