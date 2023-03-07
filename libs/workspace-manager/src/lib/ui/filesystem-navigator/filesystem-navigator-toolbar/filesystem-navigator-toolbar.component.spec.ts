import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesystemNavigatorToolbarComponent } from './filesystem-navigator-toolbar.component';

describe('FilesystemNavigatorToolbarComponent', () => {
  let component: FilesystemNavigatorToolbarComponent;
  let fixture: ComponentFixture<FilesystemNavigatorToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesystemNavigatorToolbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilesystemNavigatorToolbarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('path', '/mock/path');
    fixture.componentRef.setInput('separator', '/');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should split the path input and save the parts', () => {
      expect(component.pathParts).toEqual(['mock', 'path']);
    });
  });

  describe('onPathClicked', () => {
    it('should emit path changed event with the new path', () => {
      const pathChangeEventSpy = jest.spyOn(component.pathChange, 'emit');
      component.onPartClicked('mock');
      expect(pathChangeEventSpy).toHaveBeenCalledWith('/mock');
    });
  });
});
