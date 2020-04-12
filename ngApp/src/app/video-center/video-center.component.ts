import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers:[VideoService]
})
export class VideoCenterComponent implements OnInit {
  videos: Array<Video>;
  selectedVideo: Video;
  hideNewVideoFrom:boolean=true;
  constructor(private _videoService:VideoService) { }

  ngOnInit() {
    this._videoService.getVideos()
    .subscribe(resVideoData => this.videos = resVideoData);

  }
  OnSelectVideo(video:any) {
   // console.log("asdjhasjd");
    this.selectedVideo = video;
    //console.log(this.selectedVideo);
    this.hideNewVideoFrom = true;
  }

  onSubmitAddVideo(video:Video) {
    this._videoService.addVideo(video)
    .subscribe(resNewVideo=>  {
      //console.log(res);
      this.videos.push(resNewVideo);
     // console.log(this.videos);

      this.selectedVideo = resNewVideo;
    },
    err =>console.log('HTTP Error',err));
    this.hideNewVideoFrom = true;
  }

  AddNewVideo() {
    this.hideNewVideoFrom = false;
  }

  onUpdateEvent(video:any) {
    //console.log("inside video center");
    //console.log(video);
    this._videoService.updateVideo(video)
    .subscribe(resUpdatedVideo => video = resUpdatedVideo);
    this.selectedVideo = null;
  }

  onDeleteEvent(video:any) {
    let videoArray = this.videos;
    this._videoService.deleteVideo(video)
    .subscribe(resDeletedVideo => {
      for(let i = 0; i<=videoArray.length;i++) {
        if(videoArray[i]._id == video._id) {
          videoArray.splice(i,1);
        }
      }
    });
    this.selectedVideo = null;
  }

}
