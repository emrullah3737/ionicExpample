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

  it('addHero() should return body', fakeAsync(() => {
    let result: String[];
    const form = {
      name: 'test',
      number: 1
    }
    this.heroService.addHero(form).then((heroes) => result = heroes);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({
        "data": {
          "__v": 0,
          "name": "test",
          "number": 1,
          "_id": "59b24d2e6cce4ca1489a5513"
        },
        "status": 200
      }),
    })));
    tick();
    expect(result['data']).toEqual({
      "__v": 0,
      "name": "test",
      "number": 1,
      "_id": "59b24d2e6cce4ca1489a5513"
    });
  }));


  it('deleteHero() should return data.id', fakeAsync(() => {
    let result: String[];
    const form = {
      name: 'test',
      number: 1
    }
    this.heroService.deleteHero('59b24d2e6cce4ca1489a5513').then((heroes) => result = heroes);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({
        "data": {
          "data": {
            "n": 1,
            "ok": 1
          },
          "id": "59b24d2e6cce4ca1489a5513"
        },
        "status": 200
      }),
    })));
    tick();
    expect(result['data']).toEqual({
      "data": {
        "n": 1,
        "ok": 1
      },
      "id": "59b24d2e6cce4ca1489a5513"
    });
  }));

  it('updateHero() should return body', fakeAsync(() => {
    let result: String[];
    const form = {
      name: 'test2',
      number: 1
    }
    this.heroService.updateHero(form, '59b2502d6cce4ca1489a5515').then((heroes) => result = heroes);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({
        "data": {
          "data": {
            "n": 1,
            "nModified": 1,
            "ok": 1
          },
          "body": {
            "name": "test2",
            "number": "1"
          }
        },
        "status": 200
      }),
    })));
    tick();
    expect(result['data']).toEqual({
      "data": {
        "n": 1,
        "nModified": 1,
        "ok": 1
      },
      "body": {
        "name": "test2",
        "number": "1"
      }
    });
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