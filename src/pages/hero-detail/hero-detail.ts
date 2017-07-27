import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, Events } from 'ionic-angular';
import { Heroes } from '../../app/models/heroes.model';
import { HeroesService } from '../../app/services/heroes.service';
import { UpdateHeroPage } from '../update-hero/update-hero';

/**
 * Generated class for the HeroDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-hero-detail',
  templateUrl: 'hero-detail.html',
  providers: [Heroes, HeroesService],
})
export class HeroDetailPage {


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public heroesService: HeroesService,
    public events: Events,
    public hero: Heroes) {
    events.subscribe('hero:updated', (form) => {
      console.log(form);
      this.hero = form;
      return;
    });
    this.hero = this.navParams.get('hero');
  }

  ionViewDidLoad() {
  }

  deleteHero(hero: Heroes) {
    return this.heroesService.deleteHero(hero['_id']);
  }

  delete(hero: Heroes) {
    let confirm = this.alertCtrl.create({
      title: 'Bu Heroyu silmek istediğinizden emin misiniz?',
      message: `${hero.name} adlı hero silinecektir. Emin misiniz?`,
      buttons: [
        {
          text: 'Hayır',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Evet',
          handler: () => {
            console.log('Agree clicked');
            this.deleteHero(hero)
              .then(() => {
                this.showToast('middle', `${hero.name} başarıyla silinmiştir`);
                this.events.publish('hero:synced', true);
                this.navCtrl.pop();
              })
              .catch(() => {
                this.showToast('middle', `${hero.name} silinememiştir!`);
                this.navCtrl.pop();
              });
          }
        }
      ]
    });
    confirm.present();
  }

  update(hero) {
    this.navCtrl.push(UpdateHeroPage, {
      hero
    });
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
