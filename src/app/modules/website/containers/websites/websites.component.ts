import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootStoreState } from '../../../root-store';
import { DeleteWebsiteRequest, GetWebsitesRequest } from '../../actions/website.actions';
import * as WebsiteSelectors from '../../selectors/website.selectors';
import { faEdit, faListOl, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DialogShow } from '../../../dialog/actions/dialog.actions';
import { AddWebsiteComponent } from '../../components/add-website/add-website.component';
import { SubscriptionScriptComponent } from '../../components/subscription-script/subscription-script.component';
import { ConfirmModalService } from '../../../../core/services/confirm-modal.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.scss']
})
export class WebsitesComponent implements OnInit {
  private _destruct = new Subject();
  public icons = {
    edit: faEdit,
    times: faTimes,
    list: faListOl
  };
  public websites$: Observable<any>;

  constructor(
    private store: Store<RootStoreState.RootState>,
    private confirmModalService: ConfirmModalService
  ) {
    this.websites$ = this.store.select(WebsiteSelectors.selectWebsites);
  }

  ngOnInit() {
    this.store.dispatch(new GetWebsitesRequest());
  }

  showWebsiteScripts(website) {
    this.store.dispatch(
      new DialogShow({
        component: SubscriptionScriptComponent,
        data: website
      })
    );
  }

  addWebsite() {
    this.store.dispatch(
      new DialogShow({
        component: AddWebsiteComponent
      })
    );
  }

  updateWebsite(website) {
    this.store.dispatch(
      new DialogShow({
        component: AddWebsiteComponent,
        data: website
      })
    );
  }

  removeSite(websiteId, websiteName) {
    this.confirmModalService
      .showConfirm({
        text: `Are you sure you want to remove the site: ${websiteName}`,
        title: 'Delete Website'
      })
      .pipe(take(1))
      .subscribe(
        result => result && this.store.dispatch(new DeleteWebsiteRequest({ websiteId: websiteId }))
      );
  }
}
