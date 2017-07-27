import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { Heroes } from '../../app/models/heroes.model';
import { HeroesService } from '../../app/services/heroes.service';

import { HeroDetailPage } from '../hero-detail/hero-detail'


/**
 * Generated class for the HeroesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-heroes',
  templateUrl: 'heroes.html',
  providers: [HeroesService]
})
export class HeroesPage {
  heroes: Heroes[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private heroesService: HeroesService,
    public events: Events,
  ) {
    events.subscribe('hero:synced', (boo) => {
      this.getHeroes();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeroesPage');
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroesService.getHeroes()
      .then((res) => {
        this.heroes = res['data'];
      })
      .catch((err) => {
        this.heroes = [];
      });
  }

  refleshHero(boo) {
    console.log(boo);
  }

  goDetail(hero: Heroes) {
    this.navCtrl.push(HeroDetailPage, {
      hero
    });
  }
}
