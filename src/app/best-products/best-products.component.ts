import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DataService } from '../data.service';
import { AllProductListingComponent } from '../all-product-listing/all-product-listing.component';
import { MatDialog } from '@angular/material/dialog';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-best-products',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatProgressSpinnerModule],
  templateUrl: './best-products.component.html',
  styleUrl: './best-products.component.scss'
})
export class BestProductsComponent {
   @Input() productListing:any
   @Input() viewProducts: any;
   firestore: any = inject(Firestore);
   cartItems:any = []
   @Input() isPopup:any;
   @Output() newItemEvent = new EventEmitter<number>();
   @Output() ItemsInCart = new EventEmitter<any>();
   productCount:number= 0;
   loader: boolean = false;
   userId:any = '';

  constructor(private _snackBar: MatSnackBar, public dataService: DataService,public dialog: MatDialog,private auth: Auth) {
    this.auth.onAuthStateChanged((user)=> {
      console.log('BEST--->',user)
      this.userId = user?.uid;
      
    })
}
  selectStar(value:any, product:any): void{
      product.stars.filter( (star: any) => {
        if ( star.id <= value){
          star.class = 'star-gold star';
        }else{
          star.class = 'star-gray star';
        }
        return star;
      });
    product.rating = value;
  }

  async addProductToCart(productData:any){
    try {
      this.loader = true;
      const cartRef = collection(this.firestore, 'AddedCartItems');
      await addDoc(cartRef, {userId :this.userId, ...productData});
      console.log('Product added to cart');
      this.cartItems = await this.dataService.addToCartData();
      this.dataService.updateProductCount(this.cartItems.length);
      this.ItemsInCart.emit(this.cartItems)
      this._snackBar.open('Product added to cart', 'Undo', {
        duration: 3000
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
    this.loader = false;
    
  }

  allCategories(){
    this.dialog.open(AllProductListingComponent,{
      data: this.productListing,
      width: '80%',
    })
  }
}
