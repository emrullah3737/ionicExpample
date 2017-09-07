import { Injectable } from '@angular/core';
import { Platform, AlertController, LoadingController } from 'ionic-angular';
import { Deploy } from '@ionic/cloud-angular';

@Injectable()

export class Utils {
  constructor(
    private platform: Platform,
    private deploy: Deploy,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) {}

  deployDevice() {
    if (!this.platform.is('mobileweb') && !this.platform.is('core'))
      this.deploy.check().then((snapshotAvailable: boolean) => {
        if (snapshotAvailable)
          this.showAlert('Güncelleme', 'Son sürüm gelmiştir, yükelemek ister misiniz?', (boo) => {
            if (boo) {
              this.loading().show();
              this.deploy.download().then(() => {
                return this.deploy.extract()
                  .then(() => {
                    this.deploy.load();
                    this.loading().hide();
                  })
                  .catch(() => {
                    this.loading().hide();
                  });
              });
            }
          });
      });
  }

  showAlert(title: string, message: string, cb) {
    let confirm = this.alertCtrl.create({
      title,
      message,
      buttons: [
        {
          text: 'Hayır',
          handler: () => {
            cb(false);
          }
        },
        {
          text: 'Evet',
          handler: () => {
            cb(true);
          }
        }
      ]
    });
    confirm.present();
  }

  loading(content: string = 'Please Wait...') {
    return {
      show: () => {
        const loading = this.loadingCtrl.create({
          content,
        });
        loading.present();
      },
      hide: () => {
        const loading = this.loadingCtrl.create({
          content,
        });
        loading.dismiss();
      }
    };
  }
}


export class UtilsMock extends Utils {
  
  constructor() {
    let platform: Platform;
    let deploy: Deploy;
    let alertCtrl: AlertController;
    let loadingCtrl: LoadingController;
    super(platform, deploy, alertCtrl, loadingCtrl);
  }
  deployDevice() {
    return true;
  }
  
}