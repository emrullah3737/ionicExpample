import { Injectable, ReflectiveInjector } from '@angular/core';
import { async, fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HeroesService } from './heroes.service';
import { HttpRequests } from '../library/httpRequests';

const HERO_ONE = {
  "_id": "59b0ee4bcd89a34fb496746d",
  "name": "emo",
  "number": 3,
  "__v": 0
};


describe('MockBackend HeroService Example', () => {
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      Http,
      HttpRequests,
      HeroesService,
    ]);
    this.heroService = this.injector.get(HeroesService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  it('getHeroes() should query current service url', () => {
    this.heroService.getHeroes();
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
  });

  it('getHeroes() should return some heroes', fakeAsync(() => {
    let result: String[];
    this.heroService.getHeroes().then((heroes) => result = heroes);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ data: [HERO_ONE] }),
    })));
    tick();
    expect(result['data'].length).toEqual(1, 'should contain given amount of heroes');
    expect(result['data'][0]).toEqual(HERO_ONE, ' HERO_ONE should be the first hero');
  }));

  it('getHeroes() while server is down', fakeAsync(() => {
    let result;
    let catchedError;
    this.heroService.getHeroes()
      .then((heroes) => result = heroes)
      .catch((error) => catchedError = error);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      status: 404,
    })));
    tick();
    expect(result).toBeNull();
  }));
});