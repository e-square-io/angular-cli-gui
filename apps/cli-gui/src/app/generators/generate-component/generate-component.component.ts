import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { IGenerateComponentArgs } from '@angular-cli-gui/shared/data';

import { GeneratorsService } from '../generators.service';

interface GenerateComponentForm {
  name: FormControl<string>;
  dryRun: FormControl<boolean>;
}

@Component({
  selector: 'cli-generate-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './generate-component.component.html',
  styleUrls: ['./generate-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateComponentComponent {
  readonly form = this.fb.group<GenerateComponentForm>({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    dryRun: new FormControl<boolean>(true, { nonNullable: true }),
  });

  constructor(private readonly fb: FormBuilder, private readonly generatorsService: GeneratorsService) {}

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const args: IGenerateComponentArgs = {
      dryRun: this.form.controls.dryRun.value,
    };

    console.log('Generating...');
    this.generatorsService.generateComponent(this.form.controls.name.value, args).subscribe(res => console.log(res));
  }
}
