import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  httpClient: any;

  constructor(private http:HttpClient) { }
  
  login(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(environment.apiUrl + '/api/login', data, {
      headers: headers,
    });
  }

  //about-update
  updateAbout(data: any) {
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(environment.apiUrl + '/api/about-update', data, {
      headers: headers,
      
    });
  }

  aboutDetails() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get(environment.apiUrl + '/api/about-info', {
      headers: headers,
    });
  }


  //title
  titleList() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get(environment.apiUrl + '/api/title-list', {
      headers: headers,
    });
  }

  
  subTitleList() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get(environment.apiUrl + '/api/sub-title-list', {
      headers: headers,
    });
  }

  
  deviceImageList() {
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get(environment.apiUrl + '/api/device-image-list', {
      headers: headers,
    });
  }
  
  

  createAbout(data: any) {
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(environment.apiUrl + '/api/create-about', data, {
      headers: headers,
      
    });
  }

  teamMemberList(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get(environment.apiUrl + '/api/team-memeber-info', {
      headers: headers,
    });
  }

  updateTeam(data:any)
  {
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(environment.apiUrl + '/api/update-our-team-member', data, {
      headers: headers,
      
    });
  }

  createTeam(data: any) {
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(environment.apiUrl + '/api/create-our-teams', data, {
      headers: headers,
      
    });
  }

  
  interactiveIntro(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get(environment.apiUrl + '/api/interactive-slider-info', {
      headers: headers,
    });
  }

  

  createInteractiveSlider(data:any){
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(environment.apiUrl + '/api/create-interactive-slider', data, {
      headers: headers,
      
    });
  }

  
  updateInteractiveSlider(data:any)
  {
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(environment.apiUrl + '/api/update-interactive-slider', data, {
      headers: headers,
      
    });
  }

  
  interactiveDeviceInfo(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get(environment.apiUrl + '/api/device-info', {
      headers: headers,
    });
  }

  
  updateDeviceItems(data:any){
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(environment.apiUrl + '/api/update-device-item', data, {
      headers: headers,
      
    });
  }

  createDevice(data:any){
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(environment.apiUrl + '/api/create-device', data, {
      headers: headers,
      
    });
  }

  
  ListSpecification(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get(environment.apiUrl + '/api/info-of-interactive-specification', {
      headers: headers,
    });
  }

  
  createIteractiveSpecification(data:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(environment.apiUrl + '/api/create-interactive-specification', data, {
      headers: headers,
      
    });
  }

  updateSpecification(data:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(environment.apiUrl + '/api/update-interactive-specification', data, {
      headers: headers,
      
    });
  }

  
  videoLinkDetails()
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get(environment.apiUrl + '/api/video-link-info', {
      headers: headers,
    });;
    
  }

  
  updateVideoLink(data:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(environment.apiUrl + '/api/update-video-link', data, {
      headers: headers,
      
    });
  }


}
