import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CordovaVideo } from '../../app/library/cordovaVideo';
import { CordovaMedia } from '../../app/library/cordovaMedia';

/**
 * Generated class for the VideoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
  providers: [CordovaVideo, CordovaMedia]
})
export class VideoPage {
  private videoSrc;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private video: CordovaVideo,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPage');
  }

  startRecord() {
    this.video.record()
    .then((video) => {
      console.log(video[0]['fullPath']);
      this.videoSrc = video[0]['fullPath'];
    })
    .catch(console.log);
  }

}
