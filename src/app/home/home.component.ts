import { Component, OnDestroy, OnInit } from '@angular/core';
import { count } from 'console';

import { interval, Subscription, Observable } from 'rxjs';
import {map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // })

    const customIntervalObservable = new Observable(observer => {
      let count = 0;
      setInterval( () => {
        observer.next(count);
        if(count == 5) {
          observer.complete();
        }
        if(count > 3) {
          observer.error(new Error('Counter is greater than 3!'))
        }
        count++;
      }, 1000)

    })

    this.firstObsSubscription = customIntervalObservable.pipe(filter((data: number) => {
      return data % 2 == 0;
    }), map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe((data) => {
      // console.log('Round: ' + (data + 1));
      console.log(data);
    }, error => {
      console.log(error.message);
      alert(error.message);
    }, () => {
      console.log('Completed!');
    })

  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }

}
