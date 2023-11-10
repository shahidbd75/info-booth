import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from 'src/app/shared/services/base.service';

@Injectable()
export class MatrimonialBasicCvService extends BaseHttpService {
    constructor(http: HttpClient) {
        super(http);
    }
}