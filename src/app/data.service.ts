import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  totalProductCount = new BehaviorSubject(0);
  $totalProductCount = this.totalProductCount.asObservable();
  constructor() { }

  updateProductCount(productCount: number){
    this.totalProductCount.next(productCount);
  }
}
