import { Component, OnInit,EventEmitter} from '@angular/core';
import { Video } from '../video';
import { Input } from '@angular/core';
import{ FormsModule} from '@angular/forms';

@Component({
  selector: 'video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  inputs: ['selectedVideo']['vid'],
  outputs:['updateVideoEvent','deleteVideoEvent']
  
})
export class VideoDetailComponent implements OnInit {
 @Input() vid:Video;
  video: any;
  constructor() { }

  ngOnInit() {
  }

  updateVideoEvent = new EventEmitter();
  deleteVideoEvent = new EventEmitter();

  UpdateNewVideo(vid) {
    //console.log("inside video detail");
    //console.log(vid);
    this.updateVideoEvent.emit(this.vid);
  }

  DeleteNewVideo(vid) {
    this.deleteVideoEvent.emit(this.vid);
  }

}
