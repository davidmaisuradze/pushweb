import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { websiteReducer } from './reducers/website.reducers';
import { EffectsModule } from '@ngrx/effects';
import { WebsiteEffects } from './effects/website.effects';
import { RouterModule } from '@angular/router';
import { DialogModule } from '../dialog';
import { AuthGuard } from '../../core/guards/auth.guard';

// ===== COMPONENTS =====
import { WebsitesComponent } from './containers/websites/websites.component';
import { AddWebsiteComponent } from './components/add-website/add-website.component';
import { SubscriptionScriptComponent } from './components/subscription-script/subscription-script.component';

// ===== ROUTES =====
const ROUTES = [
  {
    path: 'websites',
    component: WebsitesComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('websites', websiteReducer),
    EffectsModule.forFeature([WebsiteEffects]),
    RouterModule.forChild(ROUTES),
    DialogModule
  ],
  declarations: [WebsitesComponent, AddWebsiteComponent, SubscriptionScriptComponent],
  entryComponents: [AddWebsiteComponent, SubscriptionScriptComponent],
  providers: []
})
export class WebsiteModule {}
