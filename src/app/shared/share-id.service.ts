import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareIdService {
  id:string="";
  constructor() { }
  
  setId(data:any){
    this.id=data;
  }
  getId(){
    return this.id;
  }
}
