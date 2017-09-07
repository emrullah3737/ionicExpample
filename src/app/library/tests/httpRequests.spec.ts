import { HttpRequests, HttpRequestMock } from '../httpRequests'
import { async, TestBed, inject } from '@angular/core/testing';

describe('Class HttpRequest', () => {
  beforeEach(() => {
    try {
      TestBed.configureTestingModule({
        providers: [
            {provide: HttpRequests, useClass: HttpRequestMock},
        ]
      }).compileComponents();
    } catch (error) {
      console.log(error);
    }
  });

  it('httpRequests should be instance of HttpRequests', inject([HttpRequests], (httpRequest) => {
    expect(httpRequest instanceof HttpRequests).toBe(true);
  }));

  it('host and headers not be null', inject([HttpRequests], (httpRequest) => {
    expect(httpRequest.host).not.toBe(null);
    expect(httpRequest.headers).not.toBe(null);
  }));

});