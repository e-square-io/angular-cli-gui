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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
