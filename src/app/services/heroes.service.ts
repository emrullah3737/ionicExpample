import { Injectable } from '@angular/core';
import { Heroes } from '../models/heroes.model';
import { HttpRequests } from '../library/httpRequests';

@Injectable()
export class HeroesService {
  heroes: Heroes;
  apiUrl: string;

  constructor(private httpRequests: HttpRequests) {
    this.apiUrl = '/api/heroes';
  }

  getHeroes(): Promise<Heroes[]> {
    return this.httpRequests.fetch(this.apiUrl, { s: '-name' });
  }

  addHero(body: Heroes): Promise<any> {
    return this.httpRequests.save(this.apiUrl, body);
  }

  deleteHero(id: number): Promise<any> {
    return this.httpRequests.destroy(this.apiUrl, id);
  }

  updateHero(body: Heroes, _id: number): Promise<any> {
    body['_id'] = _id;
    return this.httpRequests.save(this.apiUrl, body);
  }

}