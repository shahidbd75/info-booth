import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ItemCreateRequestModel, ItemResponseModel, ItemUpdateRequestModel} from "../models/item.model";
import {API_ENDPOINT_CONST} from "../../shared/constants/endpoints";
import {Observable} from "rxjs";
import { OptionsModel } from 'src/app/shared/models/options-model';

@Injectable()
export class ItemService {

  constructor(private httpClient: HttpClient) { }

  addItem(requestModel: ItemCreateRequestModel): Observable<any> {
    return this.httpClient.post(API_ENDPOINT_CONST.BUY_SELL.ITEM_BASE, requestModel);
  }

  updateItem(requestModel: ItemUpdateRequestModel): Observable<any> {
    return this.httpClient.put(API_ENDPOINT_CONST.BUY_SELL.ITEM_BASE, requestModel);
  }

  removeItem(id: string): Observable<unknown> {
    return this.httpClient.delete<unknown>(`${API_ENDPOINT_CONST.BUY_SELL.ITEM_BASE}/${id}`);
  }

  getItems(): Observable<Array<ItemResponseModel>> {
    return this.httpClient.get<Array<ItemResponseModel>>(`${API_ENDPOINT_CONST.BUY_SELL.ITEM_BASE}`);
  }

  getMeasurementTypes(): Observable<Array<OptionsModel>> {
    return this.httpClient.get<Array<OptionsModel>>(`${API_ENDPOINT_CONST.BUY_SELL.ITEM_BASE}/measurement-type`);
  }
}
