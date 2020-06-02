import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { createForm, validForm } from '../../../../shared/helpers/form.helpers';
import { ViewFieldSet } from '../../../../shared/models/FieldSet';
import { CreateWebsiteRequest, UpdateWebsiteRequest } from '../../actions/website.actions';
import { RootState } from '../../../root-store/root-state';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-website',
  templateUrl: './add-website.component.html',
  styleUrls: ['./add-website.component.scss']
})
export class AddWebsiteComponent implements OnInit {
  public formFields = {
    url: {
      value: null,
      label: 'URL',
      validators: { required: true, url: true },
      view: ViewFieldSet.vertical
    },
    name: {
      label: 'Name',
      value: null,
      view: ViewFieldSet.vertical
    },
    subscribeAutomatically: {
      label: 'Subscribe Automatically',
      value: false,
      view: ViewFieldSet.horizontal
    },
    notificationTitle: {
      label: 'Notification Title',
      value: '',
      view: ViewFieldSet.horizontal
    },
    notificationBody: {
      label: 'Notification Body',
      value: '',
      view: ViewFieldSet.horizontal
    }
  };
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<RootState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = createForm(this.fb, this.formFields);
  }

  ngOnInit() {
    if (this.data) {
      this.form.patchValue({
        ...this.data
      });
    }
  }

  save() {
    if (validForm(this.form, this.formFields)) {
      if (this.data && this.data._id) {
        this.store.dispatch(
          new UpdateWebsiteRequest({
            id: this.data._id,
            ...this.form.value
          })
        );
      } else {
        this.store.dispatch(new CreateWebsiteRequest(this.form.value));
      }
    }
  }
}
