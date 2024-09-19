import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-overall-categories',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './overall-categories.component.html',
  styleUrl: './overall-categories.component.scss'
})
export class OverallCategoriesComponent {
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
      price: '$210.00'
    }
  ];
  selectStar(value:any, product:any): void{
      product.stars.filter((star: any) => {
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
