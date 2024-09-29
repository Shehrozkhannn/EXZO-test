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
 

  constructor(public dataService: DataService){

  }

  async ngOnInit(){
    const {cartItems }= await this.dataService.addToCartData();
    this.cartItems = cartItems;
  }

  // cartItems = [
  //   {
  //     image: '../../assets/powerbank.png',
  //     title: 'PowerBank',
  //     price: '$18.00',
  //     quantity: 1
  //   },
  //   {
  //     image: '../../assets/powerbank.png',
  //     title: 'Sports',
  //     price: '$18.00',
  //     quantity: 6
  //   },
  //   {
  //     image: '../../assets/powerbank.png',
  //     title: 'Trouser',
  //     price: '$18.00',
  //     quantity: 1
  //   },
  //   {
  //     image: '../../assets/powerbank.png',
  //     title: 'Laptop',
  //     price: '$18.00',
  //     quantity: 1
  //   }
  // ]

}
