import { Component, inject } from '@angular/core';
import { BestProductsComponent } from '../best-products/best-products.component';
import { CategoriesComponent } from '../categories/categories.component';
import { CollectionsComponent } from '../collections/collections.component';
import { FooterComponent } from '../footer/footer.component';
import { HotOfferComponent } from '../hot-offer/hot-offer.component';
import { LatestBlogsComponent } from '../latest-blogs/latest-blogs.component';
import { LoginComponent } from '../login/login.component';
import { MainSliderImgComponent } from '../main-slider-img/main-slider-img.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { OverallCategoriesComponent } from '../overall-categories/overall-categories.component';
import { SignupComponent } from '../signup/signup.component';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { Auth, User } from '@angular/fire/auth';
import { DocumentData, Firestore, collection, doc, getDoc, getDocs } from '@angular/fire/firestore';
import e from 'express';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard',
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
    FooterComponent,
    LoginComponent,
    SignupComponent,
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  firestore: Firestore = inject(Firestore);
  isUserLoggedIn: User | null = null;
  userData: DocumentData | null = null;
  uid:any;
  authChecked: boolean = false;
  getDashboardDataSuccess: boolean = false;
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
      image: 'assets/apple-airpods.webp',
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
    },
    {
      image: 'assets/airpods-max-removebg-preview.png',
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
      image: 'assets/red.png',
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
      image: 'assets/handsfree-removebg-preview.png',
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
      image: 'assets/mic.png',
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
      image: 'assets/string.png',
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
      image: 'assets/headphone-product.png',
      title: 'HEADPHONE SAMPLE',
      description:'Headphones are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$110.00',
      type: 'modern'
    },
    {
      image: 'assets/apple-airpods.webp',
      title: 'APPLE AIRPODS SAMPLE',
      description:'AIRPODS are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$90.00',
      type: 'professional'
    },
    {
      image: 'assets/powerbank.png',
      title: 'SAMSUMG POWER BANK SAMPLE',
      description:'Powerbank are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$210.00',
      type: 'modern'
    },
    {
      image: 'assets/airpods-max-removebg-preview.png',
      title: 'AIR PODS MAX',
      description:'Headphones are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$110.00',
      type: 'sport'
    },
    {
      image: 'assets/red.png',
      title: 'HEADPHONE ULTRA',
      description:'Headphones are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$1100.00',
      type: 'sport'
    },
    {
      image: 'assets/handsfree-removebg-preview.png',
      title: 'HANDSFREE SAMPLE',
      description:'Headphones are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$117.00',
      type: 'classic'
    },
    {
      image: 'assets/mic.png',
      title: 'MIC SAMPLE',
      description:'Headphones are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$180.00',
      type: 'classic'
    },
    {
      image: 'assets/string.png',
      title: 'STRING SAMPLE',
      description:'Headphones are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$160.00',
      type: 'classic'
    },
    {
      image: 'assets/gold-mic.jpg',
      title: 'GOLD MIC',
      description:'Gold mic are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$160.00'
    },
    {
      image: 'assets/yellow-handsfree.png',
      title: 'Yellow Handsfree',
      description:'Yellow handsfree are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$160.00',
      type: 'modern'
    },
    {
      image: 'assets/red-airpods.webp',
      title: 'Cherry Airpods',
      description:'Cherry Airpods are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$160.00',
      type: 'modern'
    },
    {
      image: 'assets/purple-bank.jpeg',
      title: 'Purple PowerBank',
      description:'Power Bank are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$160.00',
      type: 'modern'
    },
    {
      image: 'assets/pink-bank.jpeg',
      title: 'Pink PowerBank',
      description:'Pink Bank are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$190.00',
      type: 'sport'
    },
    {
      image: 'assets/purple-airpod.jpeg',
      title: 'Purple Airpod',
      description:'Pink Bank are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$190.00',
      type: 'sport'
    },
  ];

  constructor(private auth: Auth){
    this.getDashboardDataSuccess = true
    this.auth.onAuthStateChanged((user)=> {
      console.log(user);
      if(user){
        this.isUserLoggedIn = user;
        this.uid = user.uid
        this.getUserData();
      } else {
        this.isUserLoggedIn = null;
      }
      this.authChecked = true; 
    })
  }

  async getUserData() {
    this.getDashboardDataSuccess = true
    try {
      const userDocRef = doc(this.firestore, `Users/${this.uid}`);
      const snapshot = await getDoc(userDocRef);
      if(snapshot.exists()){
        this.userData = snapshot.data() 
        console.log(this.userData,'TESTING')
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
    this.getDashboardDataSuccess = false;
  }
}
