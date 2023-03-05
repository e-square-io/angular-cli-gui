import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesystemNavigatorComponent } from './filesystem-navigator.component';

describe('FilesystemNavigatorComponent', () => {
  let component: FilesystemNavigatorComponent;
  let fixture: ComponentFixture<FilesystemNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesystemNavigatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilesystemNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
