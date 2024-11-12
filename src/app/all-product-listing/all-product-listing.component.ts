import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-all-product-listing',
  standalone: true,
  imports: [CommonModule,MatRadioModule, FormsModule],
  templateUrl: './all-product-listing.component.html',
  styleUrl: './all-product-listing.component.scss'
})
export class AllProductListingComponent {
  filters: string[] = ['modern', 'professional', 'sport', 'classic','all'];
  overallProducts:any
  product:any;
  productListing:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: string){
    this.productListing = this.data
    this.overallProducts = [...this.productListing]
  }

  onRadioChange(filter:any){
    if(filter.value === 'all'){
      this.productListing = [...this.overallProducts];
    }else{
      this.productListing = this.overallProducts.filter((val:any)=> val.type === filter.value)
    }
  }
} 
