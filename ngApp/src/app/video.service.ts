import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpRequest} from '@angular/common/http';
//import{catch} from 'rxjs/add/operator/catch';
import {Observable} from 'rxjs';
import {map,catchError } from 'rxjs/operators';
//import {catchError} from 'rxjs/operators/catchError'; 
import { Video } from './video';
//import { Video } from './video';


@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private _getUrl ="http://localhost:3000/api/videos";
  private _postUrl ="http://localhost:3000/api/video";
  private _puttUrl ="http://localhost:3000/api/video/";
  private _deletetUrl ="http://localhost:3000/api/video/";


  constructor(private _http:HttpClient) {}

  getVideos():Observable<Video[]> {
   // console.log("sdfdsf");
    return this._http.get<Video[]>(this._getUrl)
   // .map((response:Response)=>response.json());
    .pipe(map(res => res));
  }

  addVideo(video:Video) :Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json'});
  // let options = new HttpRequest({ headers:HttpHeaders });
  //console.log(JSON.stringify(video));
  //return this._http.post<Video[]>(this._postUrl,JSON.stringify(video))
  return this._http.post<Video[]>(this._postUrl,video)
    .pipe(map(res => res),
    catchError(err => err)
    );
  }

  updateVideo(video:Video):Observable<any> {
    //console.log("inside video service");
    //console.log(video);
    return this._http.put<Video[]>(this._puttUrl + video._id,video)
    .pipe(map(res=>res),
    catchError(err=>err)
    );
  }

  deleteVideo(video:Video):Observable<any>  {
    return this._http.delete(this._deletetUrl + video._id)
    .pipe(map(res=>res));
  }
  
}
