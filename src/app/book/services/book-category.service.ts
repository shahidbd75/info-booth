import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { BaseHttpService } from 'src/app/shared/services/base.service';

@Injectable()
export class BookCategoryService extends BaseHttpService{
  base_url: string = API_ENDPOINT_CONST.BOOK.BOOK_CATEGORIES_BASE;

  constructor(http: HttpClient) { 
    super(http);
    this.setBaseUrl(this.base_url);
  }
  
}
