import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from '../auth';
import { DialogModule } from '../dialog';
import { WebsiteModule } from '../website';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    AuthModule,
    WebsiteModule,
    DialogModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ]
})
export class RootStoreModule {}
