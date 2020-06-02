import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// ===== MODULES =====
import { RootStoreModule } from './modules/root-store';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth';
import { WebsiteModule } from './modules/website';
import { NotificationModule } from './modules/notification';

// ===== COMPONENTS =====
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ===== ROUTES =====
const ROUTES = [
  {
    path: 'notfound',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'push-notifications' }),
    RootStoreModule,
    CoreModule,
    SharedModule,
    AuthModule,
    WebsiteModule,
    NotificationModule,
    RouterModule.forRoot(ROUTES, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      useHash: false
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
