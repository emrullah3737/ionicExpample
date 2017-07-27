import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Heroes } from '../../app/models/heroes.model';
import { HeroesService } from '../../app/services/heroes.service';
import { HeroesPage } from '../heroes/heroes';

/**
 * Generated class for the AddHeroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-hero',
  templateUrl: 'add-hero.html',
  providers: [HeroesService]
})
export class AddHeroPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private heroesService: HeroesService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddHeroPage');
  }

  addHero(form: Heroes): void {
    this.heroesService.addHero(form)
      .then(() => {
        this.navCtrl.push(HeroesPage);
        this.showToast('middle', 'Successful!');
      })
      .catch(() => { this.showToast('middle', 'Error!') });
  }

  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message,
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }

}
