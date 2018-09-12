import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  today: Date;
  leftDate: Date;
  percent: number;
  service: {
    years: number,
    months: number,
    days: number,
    hours: number,
    minutes: number,
    seconds: number
  };
  tiles = [
    [0.4, 0.4, 0.4, 0.4, 0.4, 0.4], [0.4, 0.4, 0.4, 0.4, 0.4, 0.4],
    [0.4, 0.4, 0.4, 0.4, 0.4, 0.4], [0.4, 0.4, 0.4, 0.4, 0.4, 0.4],
    [0.4, 0.4, 0.4, 0.4, 0.4, 0.4], [0.4, 0.4, 0.4, 0.4, 0.4, 0.4],
    [0.4, 0.4, 0.4, 0.4, 0.4, 0.4], [0.4, 0.4, 0.4, 0.4, 0.4, 0.4]
  ];

  constructor(public navCtrl: NavController) {
    setInterval(this.timeNow, 1000)
  }

  randomOpac(){
    // 720 days / (48 boxes * 60 percent incrimented by 4) = .25

  }

  timeNow(){
    this.today = new Date();
    this.leftDate = new Date(2018, 8, 18, 21, 55, 0);
    console.log("time: ", this.today);
    let total = this.today.getTime() - this.leftDate.getTime();
    let t = Math.abs(total);
    this.service = {
      years: Math.floor(t  / (1000 * 60 * 60 * 24 * 365)),
      months: this.today.getMonth() - this.leftDate.getMonth(),
      days: Math.floor((t  / (1000 * 60 * 60 * 24)) % 365),
      hours: Math.floor((t  / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((t  / 1000 / 60) % 60),
      seconds: Math.floor((t  /1000) % 60)
    };
    if (this.service.months < 0)
      this.service.months += 12;
    this.percent = Math.floor(t / (1000 * 60 * 60 * 24)) / 7.2;
    console.log(this.percent);
    return {
      years: this.service.years === 1 ? this.service.years + " year" : this.service.years + " years",
      months: this.service.months === 1 ? this.service.months + " month" : this.service.months + " months",
      days: this.service.days === 1 ? this.service.days + " day" : this.service.days + " days",
      hours: this.service.hours === 1 ? this.service.hours + " hour" : this.service.hours + " hours",
      minutes: this.service.minutes === 1 ? this.service.minutes + " minute" : this.service.minutes + " minutes",
      seconds: this.service.seconds === 1 ? this.service.seconds + " second" : this.service.seconds + " seconds",
    };
  }
}
