import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModuleService } from './services/auth-module.service';
import { httpInterceptorProviders } from './interceptors';
import { WebsiteService } from './services/website.service';
import { ConfirmModalService } from './services/confirm-modal.service';
import { NotificationService } from './services/notification.service';

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthModuleService,
    httpInterceptorProviders,
    WebsiteService,
    ConfirmModalService,
    NotificationService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule instance already exists');
    }
  }
}
