import {
  Directive,
  OnInit,
  TemplateRef,
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  Host,
  SkipSelf,
  Input,
  Optional
} from '@angular/core';
import { FieldSetComponent } from '../components/field-set/field-set.component';
import { ControlContainer, FormGroup, AbstractControl } from '@angular/forms';
import { FieldSet } from '../models/FieldSet';

@Directive({
  selector: '[fieldSet]'
})
export class FieldSetDirective implements OnInit {
  private _fieldset: FieldSet;
  private wrapperContainer: ComponentRef<FieldSetComponent>;
  private control: AbstractControl;

  @Input() set fieldSet(field: FieldSet) {
    this._fieldset = field;
    if (this.parent && this.parent.control) {
      this.control = this._fieldset && (this.parent.control as FormGroup).get(field.id);
    }
  }
  constructor(
    @Host() @SkipSelf() @Optional() private parent: ControlContainer,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    const containerFactory = this.componentFactoryResolver.resolveComponentFactory(
      FieldSetComponent
    );
    this.wrapperContainer = this.viewContainerRef.createComponent(containerFactory);
    this.wrapperContainer.instance.template = this.templateRef;
    this.wrapperContainer.instance.control = this.control;
    this.wrapperContainer.instance.options = this._fieldset;
  }
}
