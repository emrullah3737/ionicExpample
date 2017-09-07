import { Utils, UtilsMock } from '../utils'
import { async, TestBed, inject } from '@angular/core/testing';

describe('Class Utils', () => {
  beforeEach(() => {
    try {
      TestBed.configureTestingModule({
        providers: [
            {provide: Utils, useClass: UtilsMock},
        ]
      }).compileComponents();
    } catch (error) {
      console.log(error);
    }
  });

  it('utils should be instance of Utils', inject([Utils], (utils) => {
    expect(utils instanceof Utils).toBe(true);
  }));

  it('deployDevice() must be defined', inject([Utils], (utils) => {
    expect(utils.deployDevice).not.toBe(null);
  }));

  it('showAlert(title: string, message: string, cb) should be defined', inject([Utils], (utils) => {
    expect(utils.showAlert).not.toBe(null);
  }));

  it('loading(content: string).show() should be defined', inject([Utils], (utils) => {
    expect(utils.loading().show).not.toBe(null);
  }));

  it('loading(content: string).hide() should be defined', inject([Utils], (utils) => {
    expect(utils.loading().hide).not.toBe(null);
  }));

});