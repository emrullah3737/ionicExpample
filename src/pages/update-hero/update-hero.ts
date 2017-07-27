import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HeroesService } from '../../app/services/heroes.service';

/**
 * Generated class for the UpdateHeroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-update-hero',
  templateUrl: 'update-hero.html',
  providers: [HeroesService],
})
export class UpdateHeroPage {
  myForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private heroesService: HeroesService,
    public events: Events,
    public toastCtrl: ToastController,
  ) {
    this.myForm = this.fb.group({
      name: navParams.get('hero')['name'],
      id: navParams.get('hero')['id']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateHeroPage');
  }

  updateHero(form) {
    this.heroesService.updateHero(form, this.navParams.get('hero')['_id'])
      .then(() => {
        this.events.publish('hero:synced', true);
        form['_id'] = this.navParams.get('hero')['_id'];
        this.events.publish('hero:updated', form);
        this.navCtrl.pop();
        this.showToast('middle', 'Successful!');
      })
      .catch(() => {
        this.navCtrl.pop();
        this.showToast('middle', 'Error!');
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
