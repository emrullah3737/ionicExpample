import { async, TestBed, fakeAsync, inject } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';
import { Nav, NavController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Utils, UtilsMock } from '../app/library/utils';

import { MyApp } from './app.component';
import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock,
  NavMock
} from '../../test-config/mocks-ionic';

describe('MyApp Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: Utils, useClass: UtilsMock },
        { provide: Nav, useClass: NavMock },
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof MyApp).toBe(true);
  });

  it('should have six pages', () => {
    expect(component.pages.length).toBe(6);
  });

  it('should openPage execute', () => {
    spyOn(component.nav, "setRoot");
    component.openPage(component.pages[0]);
    expect(component.nav.setRoot).toHaveBeenCalledWith(component.pages[0].component);
  });
  
});