import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, NavParams } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { HeroesPage } from './heroes';
import { HttpRequests, HttpRequestMock } from '../../app/library/httpRequests';
import { HeroesService, HeroesServiceMock } from '../../app/services/heroes.service';
import {
  NavMock,
  NavParamsMock
} from '../../../test-config/mocks-ionic';

let comp: HeroesPage;
let fixture: ComponentFixture<HeroesPage>;
let de: DebugElement;
let el: HTMLElement;

describe('Page: Heroes Page', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [MyApp, HeroesPage],

      providers: [
        {
          provide: NavController,
          useClass: NavMock
        },
        {
          provide: HeroesService,
          useClass: HeroesServiceMock
        },
        {
          provide: HttpRequests,
          useClass: HttpRequestMock
        },
        {
          provide: NavParams,
          useClass: NavParamsMock
        },

      ],

      imports: [
        IonicModule.forRoot(MyApp)
      ]

    }).compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(HeroesPage);
    comp = fixture.componentInstance;

  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    de = null;
    el = null;
  });

  it('is created', () => {

    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();

  });

  it('should be title is "Heroes"', () => {
    de = fixture.debugElement.query(By.css('ion-title'));
    el = de.nativeElement;
    expect(el.textContent).toContain('Heroes');
  });

});