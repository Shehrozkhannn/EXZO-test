import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-items-progress-cart',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './items-progress-cart.component.html',
  styleUrl: './items-progress-cart.component.scss'
})
export class ItemsProgressCartComponent implements OnInit {
  cartItems: any = [];
  totalCartPrice: number = 0;
  loading: boolean = false;
  noItemsIntheCart: boolean = false;

  constructor(public dataService: DataService,) { }

  async ngOnInit() {
    this.loadCartItems();
  }

  async loadCartItems() {
    try {
      this.loading = true;
      const { cartItems } = await this.dataService.addToCartData();
      this.cartItems = cartItems;
      this.calculateTotalPrice();
      if(!this.cartItems.length) this.noItemsIntheCart = true;
    }
    catch (error) {
      console.error('Error fetching cart data:', error);
    }
    finally {
      this.loading = false;
    }
  }

  calculateTotalPrice() {
    this.totalCartPrice = this.cartItems.reduce(
      (acc: number, item: { price: number; quantity: number }) => acc + item.price * item.quantity,
      0
    );
  }

  async increaseItemQuantity(item: any) {
    item.quantity++;
    item.modifiedPrice = item.price * item.quantity;
    await this.updateCartItem(item);
  }

  async descreaseItemQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      item.modifiedPrice = item.price * item.quantity;
      await this.updateCartItem(item);
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete this Item from your cart ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(async(result) => {
        if (result.isConfirmed) {
          try {
            this.cartItems = this.cartItems.filter((cartItem:any)=> item.id !== cartItem.id);
            await this.dataService.deleteCartItem(item.documentId);  // Method to delete the item from Firestore
            this.dataService.updateProductCount(this.cartItems.length);
            this.noItemsIntheCart = true;
            Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
          } catch (error) {
            console.error('Error deleting cart item:', error);
            Swal.fire('Error!', 'There was an issue deleting the item.', 'error');
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your item is safe :)', 'error');
        }
      });
    }
  }

  async updateCartItem(item: any) {
    try {
      await this.dataService.updateCartItem(item);
      this.calculateTotalPrice();  // Recalculate total price after quantity update
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  }
}
