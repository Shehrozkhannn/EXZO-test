import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgImageSliderModule } from 'ng-image-slider';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AddToCartProductsComponent } from '../add-to-cart-products/add-to-cart-products.component';
import {MatDialog} from '@angular/material/dialog';
import { log } from 'console';
import { LearnMoreComponent } from '../learn-more/learn-more.component';

@Component({
  selector: 'app-main-slider-img',
  standalone: true,
  imports: [NgImageSliderModule
  ,SlickCarouselModule,
  CommonModule
],
  templateUrl: './main-slider-img.component.html',
  styleUrl: './main-slider-img.component.scss'
})
export class MainSliderImgComponent {
@Input() viewProducts: any;
@Input() variant:string | undefined;
@Input() isUserLoggedIn:any
constructor(public dialog: MatDialog) {}

slides = [
  {
    description: 'REAL BEAT TRX',
    backgroundColor: 'linear-gradient(90deg, rgba(177,205,2,1) 46%, rgba(13,224,185,1) 100%)',
    image: 'assets/518-5188983_music-icons-png-free-transparent-png-removebg-preview.png'
  },
  {
    description: 'SOLO BEAT FRX',
    backgroundColor: 'linear-gradient(90deg, rgba(13,95,224,1) 38%, rgba(177,205,2,1) 100%)',
    image: 'assets/string.png',
  }
];
// slideConfig = {
//   infinite: true,
//   autoplay: true,
//   autoplaySpeed: 2000,
//   arrows: true
// };
get customStyles() {
  return this.variant === 'second' ? 'custom-styles-for-second-slider' : '';
}
addtoCart(){
  console.log(this.isUserLoggedIn)
  this.dialog.open(AddToCartProductsComponent,{
    data: this.viewProducts,
    autoFocus: false,
  });
}

learnMore(){
  this.dialog.open(LearnMoreComponent)
}
}
