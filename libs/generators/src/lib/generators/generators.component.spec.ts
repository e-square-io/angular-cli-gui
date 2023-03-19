import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { GeneratorsService } from '../services/generatos-service/generators.service';

import { GeneratorsComponent } from './generators.component';

describe('GeneratorsComponent', () => {
  let component: GeneratorsComponent;
  let fixture: ComponentFixture<GeneratorsComponent>;
  let generatorsServiceMock: Partial<GeneratorsService>;

  beforeEach(async () => {
    generatorsServiceMock = {
      getGeneratorsList: () =>
        of([
          {
            displayName: 'Component',
            originalName: 'component',
            description: 'generate component',
          },
        ]),
    };

    await TestBed.configureTestingModule({
      imports: [GeneratorsComponent, NoopAnimationsModule, RouterTestingModule],
      providers: [
        { provide: GeneratorsService, useValue: generatorsServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Init', () => {
    it('Should set menu items with list of generators', fakeAsync(() => {
      component.menuItems$.subscribe((menuItems) => {
        expect(menuItems).toEqual([
          {
            displayName: 'Component',
            url: 'component',
          },
        ]);
      });
      flush();
    }));
  });
});
