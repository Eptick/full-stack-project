import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private base: string = CONSTANTS.API_URL;

  constructor(private http: HttpClient) {}


  uploadFile(file: File) {
    const data: FormData = new FormData();
    data.append('file', file);
    return this.http.post(`${this.base}/media`,data)
  }
}
