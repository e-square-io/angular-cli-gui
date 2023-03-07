import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Directory } from '@angular-cli-gui/shared/data';

import { FilesystemNavigatorComponent } from './filesystem-navigator.component';

describe('FilesystemNavigatorComponent', () => {
  let component: FilesystemNavigatorComponent;
  let fixture: ComponentFixture<FilesystemNavigatorComponent>;

  const directoriesMock: Directory[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesystemNavigatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilesystemNavigatorComponent);
    component = fixture.componentInstance;
    component.path = '/mock/path';
    component.directories = directoriesMock;
    component.separator = '/';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onPathChanged', () => {
    it('Should emit path changed event', () => {
      const pathChangeEmitSpy = jest.spyOn(component.pathChange, 'emit');
      component.onPathChanged('new/path');
      expect(pathChangeEmitSpy).toHaveBeenCalledWith('new/path');
    });
  });

  describe('onDirClicked', () => {
    it('should append the dir name to the current path and emit path changed event', () => {
      const pathChangeEmitSpy = jest.spyOn(component.pathChange, 'emit');
      component.onDirClicked({ name: 'abc', isNG: false });
      expect(pathChangeEmitSpy).toHaveBeenCalledWith('/mock/path/abc');
    });
  });
});
