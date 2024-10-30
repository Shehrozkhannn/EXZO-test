import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DataService } from '../data.service';
import { AllProductListingComponent } from '../all-product-listing/all-product-listing.component';
import { MatDialog } from '@angular/material/dialog';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, collection, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
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
   @Output() test: EventEmitter<any> = new EventEmitter();
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

  async addProductToCart(productData: any) {
    try {
      this.loader = true;
      // Set initial quantity to 1 if it doesn’t exist, or increment it if it does.
      productData.quantity = productData.quantity ? productData.quantity + 1 : 1;
      // Reference to the cart items collection in Firebase
      const cartRef = collection(this.firestore, 'AddedCartItems');
  
      // Query to check if the item with the same ID already exists in the user's cart
      const q = query(cartRef, where("userId", "==", this.userId), where("id", "==", productData.id));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        // If the item exists, update the quantity
        const existingDoc = querySnapshot.docs[0];
        const existingDocRef = doc(this.firestore, 'AddedCartItems', existingDoc.id);
        const existingData = existingDoc.data();
  
        // Update the quantity in Firebase
        await updateDoc(existingDocRef, {
          quantity: (existingData['quantity'] || 0) + 1,
        });
  
        this._snackBar.open('Product quantity updated in cart', 'Undo', { duration: 3000 });
      } else {
        // If the item does not exist, add it as a new document
        await addDoc(cartRef, { userId: this.userId, ...productData });
  
        this._snackBar.open('Product added to cart', 'Undo', { duration: 3000 });
      }
  
      // Update local cart items and item count in the data service
      const { cartItems, itemCount } = await this.dataService.addToCartData();
      this.cartItems = cartItems;
      this.dataService.updateProductCount(itemCount);
  
    } catch (error) {
      console.error('Error adding product to cart:', error);
    } finally {
      this.loader = false;
    }
  }

  allCategories(){
    this.dialog.open(AllProductListingComponent,{
      data: this.productListing,
      width: '80%',
    })
  }
}
