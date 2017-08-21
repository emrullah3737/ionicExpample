import { Injectable } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media';

@Injectable()

export class CordovaMedia {

  constructor(private media: Media) {
    console.log('Media constructor');
  }

  public create(path: string): MediaObject {
    return this.media.create(path);
  }

  public startRecord(file: MediaObject) {
    file.startRecord();
  }

  public stopRecord(file: MediaObject) {
    file.stopRecord();
  }

  public pauseRecord(file: MediaObject) {
    file.pauseRecord();
  }

  public play(file: MediaObject) {
    file.play();
  }

  public pause(file: MediaObject) {
    file.pause();
  }

  public stop(file: MediaObject) {
    file.stop();
  }

  public skipTo(file: MediaObject, second: number) {
    file.seekTo(second * 1000);
  }

  public duration(file: MediaObject) {
    return file.getDuration();
  }

  public position(file: MediaObject): Promise<any> {
    return file.getCurrentPosition();
  }

  public onProcess(file: MediaObject): Promise<any> {
    return new Promise((resolve, reject) => {
      file.onSuccess.subscribe(() => resolve());
      file.onError.subscribe(() => reject());
    });
  }

  public onStatusUpdate(file: MediaObject): Promise<any> {
    return new Promise((resolve) => {
      file.onStatusUpdate.subscribe(() => resolve());
    });
  }
}