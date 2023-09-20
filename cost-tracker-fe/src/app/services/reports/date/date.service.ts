import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private dateSource: BehaviorSubject<{ month: number; year: number }>; // a subject to keep track on changes of date value entry
  public currentDate: Observable<{ month: number; year: number }>; // an observable to save a readonly value of the subject

  constructor() {
    //we initiate it with the current month and year
    this.dateSource = new BehaviorSubject<{ month: number; year: number }>({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    });

    this.currentDate = this.dateSource.asObservable(); // we convert the subject into a readonly observable, whihc emits the same values
  }

  updateDate(month: number, year: number) {
    this.dateSource.next({ month, year });
  }
}
