import { Injectable } from '@angular/core';
import { VideoCapturePlus, VideoCapturePlusOptions } from '@ionic-native/video-capture-plus';
import { VideoPlayer } from '@ionic-native/video-player';

@Injectable()

export class CordovaVideo {

  constructor(
    private videoCapturePlus: VideoCapturePlus,
    private videoPlayer: VideoPlayer
  ) {

  }
  private options(): VideoCapturePlusOptions {
    const options: VideoCapturePlusOptions = {
      limit: 1,
      highquality: true,
      portraitOverlay: 'assets/img/camera/overlay/portrait.png',
      landscapeOverlay: 'assets/img/camera/overlay/landscape.png'
    };

    return options;
  }

  public record() : Promise<any> {
    return this.videoCapturePlus.captureVideo(this.options());
  }

  public play(path: string) : Promise<any> {
    return this.videoPlayer.play(path);
  }
}