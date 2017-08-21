import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Utils } from '../app/library/utils';

import { HeroesPage } from '../pages/heroes/heroes';
import { AddHeroPage } from '../pages/add-hero/add-hero';
import { AddPhotoPage } from '../pages/add-photo/add-photo';
import { FacebookLoginPage } from "../pages/facebook-login/facebook-login";
import { AudioPage } from "../pages/audio/audio";
import { VideoPage } from "../pages/video/video";

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HeroesPage;

  pages: Array<{ title: string, component: any, icon: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public utils: Utils,
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      // { title: 'Home', component: HomePage },
      { title: 'Heroes', component: HeroesPage, icon: 'contact' },
      { title: 'Add Hero', component: AddHeroPage, icon: 'add-circle' },
      { title: 'Add Photo', component: AddPhotoPage, icon: 'camera' },
      { title: 'Facebook Login', component: FacebookLoginPage, icon: 'logo-facebook' },
      { title: 'Audio', component: AudioPage, icon: 'volume-up' },
      { title: 'Video', component: VideoPage, icon: 'videocam' },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.utils.deployDevice();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
