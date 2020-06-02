import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WebsiteService {
  constructor(private http: HttpClient) {}

  getWebsites = () => this.http.get('/api/website');

  addNewWebsite = data => this.http.post('/api/website/', data);

  updateWebsite = data => this.http.put('/api/website/', data);

  deleteWebsite = websiteId => this.http.delete(`/api/website/${websiteId}`);
}
