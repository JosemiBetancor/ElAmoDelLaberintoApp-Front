import { Injectable } from '@angular/core';
import { NzNotificationDataOptions, NzNotificationService } from 'ng-zorro-antd/notification';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private readonly notification: NzNotificationService,
  ) { }

  createNotification(type:string,title:string, content:string, options?:NzNotificationDataOptions): void {
    this.notification.create(
      type,
      title,
      content,
      {
        nzPlacement: 'bottomRight',
        nzDuration: 5000,
        nzPauseOnHover: true,
        ...options
      }
    );
  }


}
