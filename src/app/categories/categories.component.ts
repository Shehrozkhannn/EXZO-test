import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AllProductListingComponent } from '../all-product-listing/all-product-listing.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  @Input() productListing:any
  viewProducts = [
    {
      image: 'assets/headphone-product.png',
      title: 'HEADPHONE SAMPLE',
      rating: 0,
      stars: [
        {
          id: 1,
          icon: 'star',
          class: 'star-gray star-hover star'
        },
        {
          id: 2,
          icon: 'star',
          class: 'star-gray star-hover star'
        },
        {
          id: 3,
          icon: 'star',
          class: 'star-gray star-hover star'
        },
        {
          id: 4,
          icon: 'star',
          class: 'star-gray star-hover star'
        },
        {
          id: 5,
          icon: 'star',
          class: 'star-gray star-hover star'
        }
    
      ],
      description:'Headphones are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$110.00'
    },
    {
      image: 'assets/airpods-pro.png',
      title: 'APPLE AIRPODS SAMPLE',
      rating: 0,
      stars: [
        {
          id: 1,
          icon: 'star',
          class: 'star-gray star-hover star'
        },
        {
          id: 2,
          icon: 'star',
          class: 'star-gray star-hover star'
        },
        {
          id: 3,
          icon: 'star',
          class: 'star-gray star-hover star'
        },
        {
          id: 4,
          icon: 'star',
          class: 'star-gray star-hover star'
        },
        {
          id: 5,
          icon: 'star',
          class: 'star-gray star-hover star'
        }
    
      ],
      description:'AIRPODS are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$90.00'
    },
    {
      image: 'assets/powerbank.png',
      title: 'SAMSUMG POWER BANK SAMPLE',
      rating: 0,
      stars: [
        {
          id: 1,
          icon: 'star',
          class: 'star-gray star-hover star'
        },
        {
          id: 2,
          icon: 'star',
          class: 'star-gray star-hover star'
        },
        {
          id: 3,
          icon: 'star',
          class: 'star-gray star-hover star'
        },
        {
          id: 4,
          icon: 'star',
          class: 'star-gray star-hover star'
        },
        {
          id: 5,
          icon: 'star',
          class: 'star-gray star-hover star'
        }
    
      ],
      description:'Powerbank are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$210.00'
    }
  ];
  constructor(public dialog: MatDialog){

  }

  allCategories(){
    this.dialog.open(AllProductListingComponent,{
      data: this.productListing,
      width: '80%',
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
}
