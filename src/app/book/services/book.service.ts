import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../../app/shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { Observable } from 'rxjs';
import { OptionsModel } from 'src/app/shared/models/options-model';

@Injectable()
export class BookService extends BaseHttpService {
  private base_url: string = API_ENDPOINT_CONST.BOOK.BOOK_BASE;
  constructor(http: HttpClient) {
    super(http);
    this.setBaseUrl(this.base_url);
  }

  getBookCategories(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(`${this.base_url}/book-categories`);
  }

  getBookEditions(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(`${this.base_url}/editions`);
  }

  getPersonOptions(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(`${API_ENDPOINT_CONST.PERSONNEL.PERSON_BASE}/options`);
  }

  getLanguageOptions(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(`${API_ENDPOINT_CONST.COMMON.LANGUAGE_BASE}/options`);
  }
}
