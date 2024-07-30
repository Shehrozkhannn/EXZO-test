import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { BestProductsComponent } from '../best-products/best-products.component';

@Component({
  selector: 'app-add-to-cart-products',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,BestProductsComponent],
  templateUrl: './add-to-cart-products.component.html',
  styleUrl: './add-to-cart-products.component.scss'
})
export class AddToCartProductsComponent {
  productsData:any;
  isPopup:boolean = true;
  productsCount:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
  private dialogRef: MatDialogRef<AddToCartProductsComponent>) {

    console.log(this.data)
    this.productsData = this.data;
   }

   newItemEvent(count:number){
      console.log(count)
      this.productsCount = count;
   }

   close(){
    this.dialogRef.close({ data: this.productsCount })
   }
}
