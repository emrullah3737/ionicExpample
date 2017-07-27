import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { Camera } from '@ionic-native/camera';
import { Utils } from '../app/library/utils';
import { HttpRequests } from '../app/library/httpRequests';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '573b8113'
  }
};

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HeroesPage } from '../pages/heroes/heroes';
import { HeroDetailPage } from '../pages/hero-detail/hero-detail'
import { AddHeroPage } from '../pages/add-hero/add-hero';
import { UpdateHeroPage } from '../pages/update-hero/update-hero';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AddPhotoPage } from "../pages/add-photo/add-photo";
import { FacebookLoginPage } from "../pages/facebook-login/facebook-login";
import { Facebook } from "@ionic-native/facebook";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HeroesPage,
    HeroDetailPage,
    AddHeroPage,
    AddPhotoPage,
    UpdateHeroPage,
    FacebookLoginPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HeroesPage,
    AddPhotoPage,
    HeroDetailPage,
    AddHeroPage,
    UpdateHeroPage,
    FacebookLoginPage
  ],
  providers: [
    Facebook,
    Camera,
    Utils,
    HttpRequests,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
