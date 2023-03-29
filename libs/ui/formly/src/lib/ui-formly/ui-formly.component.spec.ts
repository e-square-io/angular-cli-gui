import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiFormlyComponent } from './ui-formly.component';

describe('UiFormlyComponent', () => {
  let component: UiFormlyComponent;
  let fixture: ComponentFixture<UiFormlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiFormlyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiFormlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
