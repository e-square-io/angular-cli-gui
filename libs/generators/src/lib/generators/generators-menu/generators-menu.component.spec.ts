import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GeneratorsMenuComponent } from './generators-menu.component';

describe('GeneratorsMenuComponent', () => {
  let component: GeneratorsMenuComponent;
  let fixture: ComponentFixture<GeneratorsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneratorsMenuComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneratorsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
