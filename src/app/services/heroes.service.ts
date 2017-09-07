import { Injectable } from '@angular/core';
import { Heroes } from '../models/heroes.model';
import { HttpRequests } from '../library/httpRequests';

@Injectable()
export class HeroesService {
  heroes: Array<Heroes>;
  apiUrl: string;

  constructor(private httpRequests: HttpRequests) {
    this.apiUrl = '/api/heroes';
  }

  public getHeroes(): Promise<Heroes[]> {
    return this.httpRequests.fetch(this.apiUrl, { s: '-name' });
  }

  public addHero(body: Heroes): Promise<any> {
    return this.httpRequests.save(this.apiUrl, body);
  }

  public deleteHero(id: number): Promise<any> {
    return this.httpRequests.destroy(this.apiUrl, id);
  }

  public updateHero(body: Heroes, _id: number): Promise<any> {
    body['_id'] = _id;
    return this.httpRequests.save(this.apiUrl, body);
  }

}

export class HeroesServiceMock extends HeroesService {
  constructor() {
    let httpRequests: HttpRequests;
    super(httpRequests);
  }
}