import { Injectable } from '@angular/core';
import {IMessage} from "../interface/IMessage";

@Injectable()
export class EmailService {
  //msgList: IMessage[];
  http = new XMLHttpRequest();

  constructor() {
    this.getList()
  }

  getList() {
    this.http.open('GET', 'http://localhost:3300/list', true);
    this.http.send();
    this.http.onload = () => {
      if (this.http.readyState === 4 && this.http.status === 200)
        console.log(this.http.responseText);
      else
        console.error(this.http.statusText);
    };
    this.http.onerror = () => {
      console.log(this.http.statusText);
    };
    this.http.send(null);
    //console.log(this.msgList);
  }

}
