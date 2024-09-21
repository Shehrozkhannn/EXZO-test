import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-items-progress-cart',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,CommonModule],
  templateUrl: './items-progress-cart.component.html',
  styleUrl: './items-progress-cart.component.scss'
})
export class ItemsProgressCartComponent {

  cartItems = [
    {
      image: '../../assets/powerbank.png',
      title: 'PowerBank',
      price: '$18.00',
      quantity: 1
    },
    {
      image: '../../assets/powerbank.png',
      title: 'Sports',
      price: '$18.00',
      quantity: 6
    },
    {
      image: '../../assets/powerbank.png',
      title: 'Trouser',
      price: '$18.00',
      quantity: 1
    },
    {
      image: '../../assets/powerbank.png',
      title: 'Laptop',
      price: '$18.00',
      quantity: 1
    }
  ]

}
