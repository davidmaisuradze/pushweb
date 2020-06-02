import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NotificationService {
  constructor(private http: HttpClient) {}

  getNotifications = () => this.http.get('/api/notification');

  addNewNotification = data => this.http.post('/api/notification/', data);

  updateNotification = data => this.http.put('/api/notification/', data);

  deleteNotification = notificationId => this.http.delete(`/api/notification/${notificationId}`);

  sendNotifications = notificationId =>
    this.http.post(`/api/notification/send/${notificationId}`, {});
}
