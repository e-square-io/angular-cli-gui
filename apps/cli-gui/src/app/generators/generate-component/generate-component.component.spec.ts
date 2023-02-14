import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateComponentComponent } from './generate-component.component';

describe('GenerateComponentComponent', () => {
  let component: GenerateComponentComponent;
  let fixture: ComponentFixture<GenerateComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
