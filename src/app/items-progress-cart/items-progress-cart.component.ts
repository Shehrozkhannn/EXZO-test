import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { DataService } from '../data.service';

@Component({
  selector: 'app-items-progress-cart',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,CommonModule],
  templateUrl: './items-progress-cart.component.html',
  styleUrl: './items-progress-cart.component.scss'
})
export class ItemsProgressCartComponent implements OnInit {
  cartItems: any = [];
  totalCartPrice:number = 0;
 

  constructor(public dataService: DataService){

  }

  async ngOnInit(){
    const {cartItems }= await this.dataService.addToCartData();
    this.cartItems = cartItems;
    this.totalCartPrice = this.cartItems.reduce((acc: any, val: { price: any; })=> acc + Number(val.price) ,0)
    console.log(this.totalCartPrice);
    
  }
}
