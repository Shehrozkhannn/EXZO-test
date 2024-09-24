import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DataService } from '../data.service';
import { AllProductListingComponent } from '../all-product-listing/all-product-listing.component';
import { MatDialog } from '@angular/material/dialog';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-best-products',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './best-products.component.html',
  styleUrl: './best-products.component.scss'
})
export class BestProductsComponent {
   @Input() productListing:any
   @Input() viewProducts: any;
   firestore: any = inject(Firestore);
   @Input() isPopup:any;
   @Output() newItemEvent = new EventEmitter<number>();
   productCount:number= 0;
   userId:any = '';

  constructor(private _snackBar: MatSnackBar, private dataService: DataService,public dialog: MatDialog,private auth: Auth) {
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
    console.log(this.viewProducts)
    this.productCount = this.productCount + 1
    this._snackBar.open('Product added to cart', 'Undo', {
      duration: 3000
    });
    this.dataService.updateProductCount(this.productCount);
    try {
      const cartRef = collection(this.firestore, 'AddedCartItems');
      await addDoc(cartRef, {userId :this.userId, ...productData});
      console.log('Product added to cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
    
  }

  allCategories(){
    this.dialog.open(AllProductListingComponent,{
      data: this.productListing,
      width: '80%',
    })
  }
}
