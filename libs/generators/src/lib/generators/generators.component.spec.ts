import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { GeneratorsComponent } from './generators.component';

describe('GeneratorsComponent', () => {
  let component: GeneratorsComponent;
  let fixture: ComponentFixture<GeneratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneratorsComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
