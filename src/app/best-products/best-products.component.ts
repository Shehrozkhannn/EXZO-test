import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DataService } from '../data.service';
import { AllProductListingComponent } from '../all-product-listing/all-product-listing.component';
import { MatDialog } from '@angular/material/dialog';

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
   @Input() isPopup:any;
   @Output() newItemEvent = new EventEmitter<number>();
   productCount:number= 0;

  constructor(private _snackBar: MatSnackBar, private dataService: DataService,public dialog: MatDialog) {}
  selectStar(value:any, product:any): void{
    // prevent multiple selection
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

  addProductToCart(){
    this.productCount = this.productCount + 1
    this._snackBar.open('Product added to cart', 'Undo', {
      duration: 3000
    });
    this.dataService.updateProductCount(this.productCount);
    // this.newItemEvent.emit(this.productCount)
  }

  allCategories(){
    this.dialog.open(AllProductListingComponent,{
      data: this.productListing,
      width: '80%',
    })
  }
}
