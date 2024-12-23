import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';
import { Products } from '../interfaces/products';
import { Firestore, addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlacedOrderDetailsComponent } from '../placed-order-details/placed-order-details.component';


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
  firestore: any = inject(Firestore);
  userId:any = '';

  constructor(public dataService: DataService, private auth: Auth, private _snackBar: MatSnackBar,private dialogRef: MatDialogRef<ItemsProgressCartComponent>,public dialog: MatDialog ) { 
    this.auth.onAuthStateChanged((user)=>this.userId = user?.uid)
  }

  async ngOnInit() {
    this.loadCartItems();
  }

  async loadCartItems() {
    try {
      this.loading = true;
      const { cartItems } = await this.dataService.addToCartData();
      this.cartItems = this.removeDuplicateItems(cartItems);;
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

  removeDuplicateItems(array:any){
    const uniqueIds = new Set(); // Track unique IDs
    return array.filter((item:any) => {
      if (!uniqueIds.has(item.id)) {
        uniqueIds.add(item.id);
        return true;
      }
      return false;
    });
  };
  
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
            await this.dataService.deleteCartItem(item.documentId);
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
      this.calculateTotalPrice();
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  }

  async placeOrder(items:Products){
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to place this Order?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(async(res)=>{
        if(res.isConfirmed){
          this.loading = true;
          const cartRef = collection(this.firestore, 'SubmitOrders');
          await addDoc(cartRef, { userId: this.userId, ...items });

          //REMOVE ALL ITEMS FROM CART
          const cartItemsRef = collection(this.firestore, 'AddedCartItems');
          const q = query(cartItemsRef, where('userId', '==', this.userId));
          const cartItemsSnapshot = await getDocs(q);
          const deletePromises = cartItemsSnapshot.docs.map((doc) => deleteDoc(doc.ref));
          await Promise.all(deletePromises);
          this.dataService.updateProductCount(0);
          this.dialogRef.close();
          this.dialog.open(PlacedOrderDetailsComponent,{
            data: {items: items, totalCartPrice: this.totalCartPrice},
            width: '60%',
            height: '500px'
          })
          this._snackBar.open('List of products submitted succesfully', 'Undo', { duration: 3000 }); 
        }
        else if (res.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'error');
        }
      })
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      this.loading = false;
    }
  }
}
