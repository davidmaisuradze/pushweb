import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// ===== COMPONENTS =====
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { FieldSetComponent } from './components/field-set/field-set.component';
import { FieldSetErrorComponent } from './components/field-set/field-set-error/field-set-error.component';
import { MaterialModule } from './modules/material.module';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

// ===== DIRECTIVES =====
import { CurrencyValidatorDirective } from './directives/currency-validator.directive';
import { FileValidatorDirective } from './directives/file-validator.directive';
import { FullEmailValidatorDirective } from './directives/full-email-validator.directive';
import { UrlValidatorDirective } from './directives/url-validator.directive';
import { FieldSetDirective } from './directives/fieldset.directive';

const SHARED_MODULES: any[] = [
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  RouterModule,
  FontAwesomeModule,
  MaterialModule
];

const SHARED_COMPONENTS: any[] = [
  PageNotFoundComponent,
  HeaderComponent,
  FooterComponent,
  ContentComponent,
  FieldSetComponent,
  FieldSetErrorComponent,
  ConfirmModalComponent
];

const ENTRY_COMPONENTS: any[] = [FieldSetComponent, FieldSetErrorComponent, ConfirmModalComponent];

const SHARED_DIRECTIVES: any[] = [
  CurrencyValidatorDirective,
  FileValidatorDirective,
  FullEmailValidatorDirective,
  UrlValidatorDirective,
  FieldSetDirective
];

const PIPES: any[] = [];

/*just import the shared module in different modules to reuse shared component*/
@NgModule({
  imports: [...SHARED_MODULES],
  exports: [...SHARED_MODULES, ...SHARED_COMPONENTS, SHARED_DIRECTIVES, ...PIPES],
  declarations: [...SHARED_COMPONENTS, ...SHARED_DIRECTIVES, ...PIPES],
  entryComponents: [...ENTRY_COMPONENTS]
})
export class SharedModule {}
