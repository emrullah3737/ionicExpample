import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CordovaMedia } from "../../app/library/cordovaMedia";
/**
 * Generated class for the AudioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-audio',
  templateUrl: 'audio.html',
  providers: [CordovaMedia]
})
export class AudioPage {
  private file1;
  private file2;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cordovaMedia: CordovaMedia,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AudioPage');
    this.file1 = this.cordovaMedia.create('file.wav');
    this.file2 = this.cordovaMedia.create('file2.wav');
  }

  startRecord() {
    this.cordovaMedia.startRecord(this.file1);
  }

  stopRecord() {
    this.cordovaMedia.stopRecord(this.file1);
  }

  play() {
    this.cordovaMedia.play(this.file1);
  }

  pause() {
    this.cordovaMedia.pause(this.file1);
  }

  startRecord2() {
    this.cordovaMedia.startRecord(this.file2);
  }

  stopRecord2() {
    this.cordovaMedia.stopRecord(this.file2);
  }

  play2() {
    this.cordovaMedia.play(this.file2);
  }

  pause2() {
    this.cordovaMedia.pause(this.file2);
  }

}
