import { Component, OnInit, OnDestroy} from '@angular/core';
import { EmailService} from "../../services/email.service";
import {IMessage} from "../../interface/IMessage";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit{
  list: IMessage[];
  sub;
  constructor(private email: EmailService) {}

  ngOnInit() {
    this.sub = this.email.getList();
  }

  showMessages(){

  }
}
