import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {
  createWorkspaceSettingsServiceMockk,
  workspaceConfigurationMock,
} from '../../testing';
import { WorkspaceSettingsService } from '../services';

import { ConfigurationComponent } from './configuration.component';

describe('ConfigurationComponent', () => {
  let component: ConfigurationComponent;
  let fixture: ComponentFixture<ConfigurationComponent>;
  let service: WorkspaceSettingsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurationComponent, NoopAnimationsModule],
      providers: [
        {
          provide: WorkspaceSettingsService,
          useValue: createWorkspaceSettingsServiceMockk(),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(WorkspaceSettingsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should formly create descriptions for fields', () => {
    const { root, sourceRoot, prefix } = workspaceConfigurationMock.properties;
    const innerHTML = fixture.debugElement.nativeElement.innerHTML;
    expect(innerHTML).toContain(root.description);
    expect(innerHTML).toContain(sourceRoot.description);
    expect(innerHTML).toContain(prefix.description);
  });

  it('should submit form', () => {
    const updateWorkspaceProjectConfigurationSpy = jest.spyOn(
      service,
      'updateWorkspaceProjectConfiguration'
    );
    fixture.debugElement.nativeElement.querySelector('button').click();
    expect(updateWorkspaceProjectConfigurationSpy).toBeCalledWith('name', {
      prefix: 'prefix',
      root: 'root',
      sourceRoot: 'sourceRoot',
    });
  });
});
