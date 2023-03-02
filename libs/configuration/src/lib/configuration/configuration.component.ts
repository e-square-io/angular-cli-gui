import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Project } from '@angular-cli-gui/shared/data';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { FormlyMaterialModule } from '@ngx-formly/material';
import {
  combineLatest,
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
} from 'rxjs';

import { WorkspaceSettingsService } from '../services';

@Component({
  selector: 'cli-configuration',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    FormlyModule,
    FormlyMaterialModule,
    ReactiveFormsModule,
  ],
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationComponent {
  private readonly projectConfiguration$ = this.workspaceSettingsService
    .readWorkspaceProjectConfiguration()
    .pipe(
      map(
        (configuration) =>
          this.schema.toFieldConfig(configuration)
            .fieldGroup as FormlyFieldConfig[]
      )
    );

  private readonly projectName$ = this.workspaceSettingsService
    .readWorkspaceProjectNames()
    .pipe(
      map((names) => names[0]),
      shareReplay({ bufferSize: 1, refCount: true })
    );

  private readonly workspaceProject$ = this.projectName$.pipe(
    switchMap((currentProjectName: string) =>
      this.workspaceSettingsService.readWorkspaceProject(currentProjectName)
    ),
    distinctUntilChanged()
  );

  readonly formly$ = combineLatest([
    this.projectConfiguration$,
    this.workspaceProject$,
  ]).pipe(map(([formFields, formData]) => ({ formFields, formData })));

  form = this.fb.group({});

  constructor(
    private workspaceSettingsService: WorkspaceSettingsService,
    private fb: FormBuilder,
    private schema: FormlyJsonschema
  ) {}

  onSubmit(): void {
    this.projectName$
      .pipe(
        switchMap((projectName) => {
          return this.workspaceSettingsService.updateWorkspaceProjectConfiguration(
            projectName,
            this.form.value as Project
          );
        })
      )
      .subscribe();
  }
}
