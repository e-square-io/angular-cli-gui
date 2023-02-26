import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormData, IFormFields } from '@angular-cli-gui/shared/data';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

@Component({
  selector: 'cli-form-builder',
  standalone: true,
  imports: [CommonModule, FormlyModule, FormlyMaterialModule, FormGroup],
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuilderComponent {
  @Input() formData: IFormData;
  @Input() formFields: IFormFields;
  @Input() formOptions: IFormOptions;

  form = new FormGroup({});

  @Output() formSubmit = new EventEmitter<IFormData>();

  public onSubmit(): void {
    this.formSubmit.emit(this.formData);
  }
}
