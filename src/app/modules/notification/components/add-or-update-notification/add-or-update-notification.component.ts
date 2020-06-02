import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { createForm, validForm } from '../../../../shared/helpers/form.helpers';
import { ViewFieldSet } from '../../../../shared/models/FieldSet';
import {
  CreateNotificationRequest,
  UpdateNotificationRequest
} from '../../actions/notification.actions';
import { RootState } from '../../../root-store/root-state';
import { Store } from '@ngrx/store';
import * as WebsiteSelectors from '../../../website/selectors/website.selectors';
import { BehaviorSubject, Observable } from 'rxjs';
import { GetWebsitesRequest } from '../../../website/actions/website.actions';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-or-update-notification',
  templateUrl: './add-or-update-notification.component.html',
  styleUrls: ['./add-or-update-notification.component.scss']
})
export class AddOrUpdateNotificationComponent implements OnInit {
  public formFields = {
    title: {
      value: null,
      label: 'Title',
      validators: { required: true },
      view: ViewFieldSet.vertical
    },
    body: {
      label: 'Body',
      value: null,
      validators: { required: true },
      view: ViewFieldSet.vertical
    },
    description: {
      label: 'Description',
      value: null,
      view: ViewFieldSet.vertical
    },
    url: {
      label: 'URL',
      value: null,
      view: ViewFieldSet.vertical
    }
  };
  public form: FormGroup;
  public websites$: Observable<any>;
  public selectedWebsites$ = new BehaviorSubject([]);

  constructor(
    private fb: FormBuilder,
    private store: Store<RootState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = createForm(this.fb, this.formFields);
    this.websites$ = this.store.select(WebsiteSelectors.selectWebsites);
  }

  ngOnInit() {
    this.store.dispatch(new GetWebsitesRequest());
    if (this.data) {
      this.form.patchValue({
        ...this.data
      });
      if (this.data.websites) {
        this.selectedWebsites$.next(this.data.websites.map(item => ({ id: item, checked: true })));
      }
    }
  }

  save() {
    if (validForm(this.form, this.formFields)) {
      const selectedWebsites = this.selectedWebsites$.value.map(item => {
        if (item.checked) {
          return item.id;
        }
      });

      if (this.data && this.data._id) {
        this.store.dispatch(
          new UpdateNotificationRequest({
            id: this.data._id,
            ...this.form.value,
            websites: selectedWebsites
          })
        );
      } else {
        this.store.dispatch(
          new CreateNotificationRequest({
            ...this.form.value,
            websites: selectedWebsites
          })
        );
      }
    }
  }

  websiteSelected(websiteId) {
    const website = this.selectedWebsites$.value.find(item => item.id === websiteId);
    if (website) {
      this.selectedWebsites$.next(
        this.selectedWebsites$.value.map(item =>
          item.id === websiteId ? { ...item, checked: !item.checked } : item
        )
      );
    } else {
      this.selectedWebsites$.next([
        ...this.selectedWebsites$.value,
        { id: websiteId, checked: true }
      ]);
    }
  }

  isChecked(websiteId) {
    const website = this.selectedWebsites$.value.find(item => item.id === websiteId);
    return website && website.checked;
  }
}
