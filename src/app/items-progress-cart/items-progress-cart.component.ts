import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-items-progress-cart',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,CommonModule,MatProgressSpinnerModule],
  templateUrl: './items-progress-cart.component.html',
  styleUrl: './items-progress-cart.component.scss'
})
export class ItemsProgressCartComponent implements OnInit {
  cartItems: any = [];
  totalCartPrice:number = 0;
  loading:boolean = false;
 
  constructor(public dataService: DataService, ){}

  async ngOnInit(){
    try{
      this.loading = true;
      const {cartItems }= await this.dataService.addToCartData();
      this.cartItems = cartItems;
      this.totalCartPrice = this.cartItems.reduce((acc: any, val: { price: any; })=> acc + Number(val.price) ,0)    
    }
    catch(error){
      console.error('Error fetching cart data:', error);
    }
    finally{
      this.loading =  false;
    }
  }

  increaseItemQuantity(item:any){
    console.log(item);
    item.price = item.price + item.price;
    
  }
}
