import { Component, OnInit } from '@angular/core';
import { EmailService} from "../../services/email.service";
import {IMessage} from "../../interface/IMessage";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  list: IMessage[];
  constructor(private email: EmailService) {}

  ngOnInit() {
    this.email.getList()
      .subscribe((data: IMessage[]) => {
        this.list = data;
        console.log(this.list);
      })
  }

  showMessages(){

  }
}
