import { Component } from '@angular/core';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MainSliderImgComponent } from '../main-slider-img/main-slider-img.component';
import { CategoriesComponent } from '../categories/categories.component';
import { CollectionsComponent } from '../collections/collections.component';
import { BestProductsComponent } from '../best-products/best-products.component';
import { HotOfferComponent } from '../hot-offer/hot-offer.component';
import { OverallCategoriesComponent } from '../overall-categories/overall-categories.component';
import { LatestBlogsComponent } from '../latest-blogs/latest-blogs.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    TopNavbarComponent,
    NavbarComponent,
    MainSliderImgComponent,
    CategoriesComponent,
    CollectionsComponent,
    BestProductsComponent,
    HotOfferComponent,
    OverallCategoriesComponent,
    LatestBlogsComponent,
    FooterComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  viewProducts = [
    {
      image: '../../assets/headphone-product.png',
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
      image: '../../assets/apple-airpods.webp',
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
      image: '../../assets/powerbank.png',
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
    },
    {
      image: '../../assets/airpods-max-removebg-preview.png',
      title: 'AIR PODS MAX',
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
      image: '../../assets/red.png',
      title: 'HEADPHONE ULTRA',
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
      price: '$1100.00'
    },
    {
      image: '../../assets/handsfree-removebg-preview.png',
      title: 'HANDSFREE SAMPLE',
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
      price: '$117.00'
    },
    {
      image: '../../assets/mic.png',
      title: 'MIC SAMPLE',
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
      price: '$180.00'
    },
    {
      image: '../../assets/string.png',
      title: 'STRING SAMPLE',
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
      price: '$160.00'
    },
  ];

  productListing  = [
    {
      image: '../../assets/headphone-product.png',
      title: 'HEADPHONE SAMPLE',
      description:'Headphones are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$110.00',
      type: 'modern'
    },
    {
      image: '../../assets/apple-airpods.webp',
      title: 'APPLE AIRPODS SAMPLE',
      description:'AIRPODS are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$90.00',
      type: 'professional'
    },
    {
      image: '../../assets/powerbank.png',
      title: 'SAMSUMG POWER BANK SAMPLE',
      description:'Powerbank are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$210.00',
      type: 'modern'
    },
    {
      image: '../../assets/airpods-max-removebg-preview.png',
      title: 'AIR PODS MAX',
      description:'Headphones are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$110.00',
      type: 'sport'
    },
    {
      image: '../../assets/red.png',
      title: 'HEADPHONE ULTRA',
      description:'Headphones are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$1100.00',
      type: 'sport'
    },
    {
      image: '../../assets/handsfree-removebg-preview.png',
      title: 'HANDSFREE SAMPLE',
      description:'Headphones are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$117.00',
      type: 'classic'
    },
    {
      image: '../../assets/mic.png',
      title: 'MIC SAMPLE',
      description:'Headphones are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$180.00',
      type: 'classic'
    },
    {
      image: '../../assets/string.png',
      title: 'STRING SAMPLE',
      description:'Headphones are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$160.00',
      type: 'classic'
    },
    {
      image: '../../assets/gold-mic.jpg',
      title: 'GOLD MIC',
      description:'Gold mic are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$160.00'
    },
    {
      image: '../../assets/yellow-handsfree.png',
      title: 'Yellow Handsfree',
      description:'Yellow handsfree are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$160.00',
      type: 'modern'
    },
    {
      image: '../../assets/red-airpods.webp',
      title: 'Cherry Airpods',
      description:'Cherry Airpods are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$160.00',
      type: 'modern'
    },
    {
      image: '../../assets/purple-bank.jpeg',
      title: 'Purple PowerBank',
      description:'Power Bank are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$160.00',
      type: 'modern'
    },
    {
      image: '../../assets/pink-bank.jpeg',
      title: 'Pink PowerBank',
      description:'Pink Bank are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$190.00',
      type: 'sport'
    },
    {
      image: '../../assets/purple-airpod.jpeg',
      title: 'Purple Airpod',
      description:'Pink Bank are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$190.00',
      type: 'sport'
    },
  ];
}
