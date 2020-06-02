import { Component, OnInit } from '@angular/core';
import { RootStoreState } from './modules/root-store';
import { AuthActions, AuthSelectors } from './modules/auth';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DialogShow } from './modules/dialog/actions/dialog.actions';
import { TestComponent } from './modules/auth/components/test/test.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'push-notifications';
  user$: Observable<any>;

  constructor(private store: Store<RootStoreState.RootState>) {}

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.LoginRequestAction({ userName: '', password: '' }));
    /*this.store.dispatch(
      new DialogShow({
        component: TestComponent
      })
    );*/
  }
}
