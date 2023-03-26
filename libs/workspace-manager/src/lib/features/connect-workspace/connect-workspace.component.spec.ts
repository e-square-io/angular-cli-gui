import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CURRENT_WORKSPACE_PATH } from '@angular-cli-gui/shared/data';
import { ConnectWorkspaceService } from '@angular-cli-gui/workspace-manager';

import { WorkspaceManagerApiService } from '../../data-access/workspace-manager-api.service';
import {
  ConnectWorkspaceServiceMock,
  DIRECTORIES_MOCK,
  getConnectWorkspaceServiceMock,
  getWorkspaceManagerApiServiceMock,
  HOMEDIR_PATH_MOCK,
  PATH_SEPARATOR_MOCK,
  WorkspaceManagerApiServiceMock,
} from '../../mocks/connect-workspace.mock';

import { ConnectWorkspaceComponent } from './connect-workspace.component';

describe('ConnectWorkspaceComponent', () => {
  let component: ConnectWorkspaceComponent;
  let fixture: ComponentFixture<ConnectWorkspaceComponent>;
  let workspaceManagerApiServiceMock: WorkspaceManagerApiServiceMock;
  let connectWorkspaceServiceMock: ConnectWorkspaceServiceMock;

  beforeEach(async () => {
    workspaceManagerApiServiceMock = getWorkspaceManagerApiServiceMock();

    connectWorkspaceServiceMock = getConnectWorkspaceServiceMock();

    await TestBed.configureTestingModule({
      imports: [
        ConnectWorkspaceComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: WorkspaceManagerApiService,
          useValue: workspaceManagerApiServiceMock,
        },
        {
          provide: ConnectWorkspaceService,
          useValue: connectWorkspaceServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectWorkspaceComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call workspaceManagerApiService.getPathSeparator', () => {
    fixture.detectChanges();
    expect(workspaceManagerApiServiceMock.getPathSeparator).toHaveBeenCalled();
  });

  it('should initialize pathSeparator subject', () => {
    fixture.detectChanges();
    expect(component.pathSeparator$.getValue()).toEqual(PATH_SEPARATOR_MOCK);
  });

  it('should call workspaceManagerApiService.getHomeDir when no workspace path in session storage', () => {
    fixture.detectChanges();
    expect(workspaceManagerApiServiceMock.getHomeDir).toHaveBeenCalled();
  });

  it('should not call workspaceManagerApiService.getHomeDir when session storage has saved workspace path', () => {
    sessionStorage.setItem(CURRENT_WORKSPACE_PATH, 'workspace/path');
    fixture.detectChanges();
    expect(workspaceManagerApiServiceMock.getHomeDir).not.toHaveBeenCalled();
    sessionStorage.clear();
  });

  it('should initialize path subject with home dir path', () => {
    fixture.detectChanges();
    expect(component.path$.getValue()).toEqual(HOMEDIR_PATH_MOCK);
  });

  it('should set isAngularWorkspace subject with false when path is not a valid workspace path', () => {
    fixture.detectChanges();
    expect(component.isAngularWorkspace$.getValue()).toBe(false);
  });

  it('should set isAngularWorkspace subject with true when path is Angular workspace', () => {
    fixture.detectChanges();
    const angularWorkspaceDirName = DIRECTORIES_MOCK[1].name;
    component.path$.next(
      `${HOMEDIR_PATH_MOCK}${PATH_SEPARATOR_MOCK}user${PATH_SEPARATOR_MOCK}${angularWorkspaceDirName}`
    );
    expect(component.isAngularWorkspace$.getValue()).toBe(true);
  });

  it('should call workspaceManagerApiService.getDirectoriesInPath with path from path$ subject', () => {
    fixture.detectChanges();
    expect(
      workspaceManagerApiServiceMock.getDirectoriesInPath
    ).toHaveBeenCalledWith(HOMEDIR_PATH_MOCK);
  });

  it('should initialize the directories subject', () => {
    fixture.detectChanges();
    expect(component.directories$.getValue()).toEqual(DIRECTORIES_MOCK);
  });

  it('should call connectService.connectWorkspace with path', () => {
    fixture.detectChanges();
    component.connectWorkspace();
    expect(connectWorkspaceServiceMock.connectWorkspace).toHaveBeenCalledWith(
      HOMEDIR_PATH_MOCK
    );
  });

  describe('onPathChanged', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should not call path$ subject next when new path equals current path', () => {
      const pathNextSpy = jest.spyOn(component.path$, 'next');
      component.onPathChanged(HOMEDIR_PATH_MOCK);
      expect(pathNextSpy).not.toHaveBeenCalled();
    });

    it('should call path$ subject next with new path when new path is different than current path', () => {
      const newPathMock = '/new/path/1';
      const pathNextSpy = jest.spyOn(component.path$, 'next');
      component.onPathChanged(newPathMock);
      expect(pathNextSpy).toHaveBeenCalledWith(newPathMock);
    });
  });
});
