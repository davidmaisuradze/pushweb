import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-subscription-script',
  templateUrl: './subscription-script.component.html',
  styleUrls: ['./subscription-script.component.scss']
})
export class SubscriptionScriptComponent implements OnInit {
  public serviceWorkerFileDownloadLink = `${environment.baseUrl}/api/website/download-service-worker`;

  constructor(@Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {}

  generateSubscriptionScript() {
    return `
            <script type="text/javascript">
                var siteId="${this.data.siteId}";
                var subscribeAutomatically=${this.data.subscribeAutomatically};
            </script>
            <script type="text/javascript" src="${environment.baseUrl}/static/service-worker-registration.js"></script>
            `;
  }
}
