import { NgModule } from '@angular/core';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../../shared/shared.module';
import { authReducer } from './reducers/auth.reducer';
import { AuthEffects } from './effects/auth.effects';
import { DialogModule } from '../dialog';

import { LoginComponent } from './containers/login/login.component';
import { TestComponent } from './components/test/test.component';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      '114397450133-ef9comr0p0tml0esck8am04kdfrjsdug.apps.googleusercontent.com'
    )
  }
]);

export function provideConfig() {
  return config;
}

// ===== ROUTES =====
const ROUTES = [
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
    SocialLoginModule,
    RouterModule.forChild(ROUTES),
    DialogModule
  ],
  providers: [
    AuthEffects,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  exports: [LoginComponent],
  declarations: [LoginComponent, TestComponent],
  entryComponents: [TestComponent]
})
export class AuthModule {}
