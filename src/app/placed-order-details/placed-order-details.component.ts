import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-placed-order-details',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './placed-order-details.component.html',
  styleUrl: './placed-order-details.component.scss'
})
export class PlacedOrderDetailsComponent implements OnInit{
  displayedColumns: string[] = ['position', 'name', 'price', 'quantity'];
  dataSource = this.orders.items;

  constructor(@Inject(MAT_DIALOG_DATA) public orders: any){

  }
  ngOnInit(){
    this.dataSource = this.dataSource.map((item:any,index:any)=> ({...item , position: index + 1}))
    console.log(this.orders)
  }
}
