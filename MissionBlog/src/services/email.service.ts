import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {IMessage} from "../interface/IMessage";

@Injectable()
export class EmailService {
  msgList;

  constructor(private http: HttpClient) {
    this.getList();
  }

  getList(): Observable<IMessage[]>{
    if (!this.msgList){
      this.msgList = this.http.get<IMessage[]>('http://localhost:3000/');
      console.log(this.msgList);
    }
    return this.msgList;
  }

}
