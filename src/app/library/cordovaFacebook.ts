import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';

@Injectable()

export class CordovaFacebook {

  constructor(private fb: Facebook) {
    console.log('Facebook constructor');
  }

  public api(url: string = '/me') {
     this.fb.api(url, [])
    .then((data) => {
      console.log(data);
    })
    .catch(console.log);
  }

  login(): Promise<any> {
    if (this.fb)
      return this.fb.login(['public_profile', 'user_friends', 'email']);
  }

  logout(): Promise<any> {
    if(this.fb)
      return this.fb.logout();
  }
}