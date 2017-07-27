import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CordovaCamera } from "../../app/library/cordovaCamera";
import { Brightness } from '@ionic-native/brightness';

/**
 * Generated class for the AddPhotoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-photo',
  templateUrl: 'add-photo.html',
  providers: [CordovaCamera, Brightness],
})
export class AddPhotoPage {

  public photo: string;
  public brightnessValue: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public camera: CordovaCamera,
    private brightness: Brightness
  ) {
    this.brightnessValue = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPhotoPage');
  }

  public setBrightness() {
    console.log(this.brightnessValue/100);
    this.brightness.setBrightness(this.brightnessValue/100);
  }

  public addPhoto() {
    this.camera.getPicture()
      .then((data: string) => {
        this.photo = data;
      })
      .catch(console.log);
  }

}
