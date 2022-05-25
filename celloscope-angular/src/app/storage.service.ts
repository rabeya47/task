import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveLoginInfo(data: any){
    let newData = JSON.stringify(data);
    localStorage.setItem("current_user", newData);
    localStorage.setItem("isLoggedIn", 'true');
  }

  getCurrentUser(){
    try{
      let struser = localStorage.getItem("current_user") || "{}"
      let user = JSON.parse(struser);
      return user;
    }catch(e){
      return {};
    }
   
  }

  isLoggedIn(){
    try{
      let isLoggedinStr = localStorage.getItem("isLoggedIn") || false
      return Boolean(isLoggedinStr);
    }catch(e){
      return false;
    }
   
  }

  logout(){
    try{
      localStorage.clear();
    }catch(e){
      console.log(e);
    }
   
  }

}
