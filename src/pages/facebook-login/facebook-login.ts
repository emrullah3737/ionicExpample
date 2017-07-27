import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CordovaFacebook } from "../../app/library/cordovaFacebook";

/**
 * Generated class for the FacebookLoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-facebook-login',
  templateUrl: 'facebook-login.html',
  providers: [CordovaFacebook],
})
export class FacebookLoginPage {
  public response;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: CordovaFacebook,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FacebookLoginPage');
  }

  login() {
    this.fb.login()
    .then((response) => {
      this.response = response;
      this.fb.api();
    })
    .catch(console.log);
  }

}
