import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {IMessage} from "../interface/IMessage";

@Injectable()
export class EmailService {
  msgList: IMessage[];

  constructor(private http: HttpClient) {
    this.getList();
  }

  getList(): Observable<IMessage[]>{
    if (!this.msgList){
      this.msgList = this.http.get<IMessage[]>('http://localhost:3000/list');
      console.log(this.msgList);
    }
    return this.msgList;
  }

}
