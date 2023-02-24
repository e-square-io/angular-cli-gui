import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { GeneratorsMenuComponent } from './generators-menu.component';

describe('GeneratorsMenuComponent', () => {
  let component: GeneratorsMenuComponent;
  let fixture: ComponentFixture<GeneratorsMenuComponent>;
  let routerMock: any;

  beforeEach(async () => {
    routerMock = {
      navigate: () => null,
    };

    await TestBed.configureTestingModule({
      imports: [GeneratorsMenuComponent],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneratorsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('navigate()', () => {
    it('Should navigate to generator with provided generator name when function was called', () => {
      jest.spyOn(routerMock, 'navigate');
      component.navigate('generator_name_mock');
      expect(routerMock.navigate).toHaveBeenCalledWith([
        'generators',
        'generator_name_mock',
      ]);
    });
  });

  describe('Menu Item', () => {
    it('Should navigate to generator when menu item was clicked', () => {
      jest.spyOn(component, 'navigate');
      const menuItem = fixture.debugElement.query(By.css('.menu-item'));
      menuItem.triggerEventHandler('click', null);
      expect(component.navigate).toHaveBeenCalled();
    });
  });
});
