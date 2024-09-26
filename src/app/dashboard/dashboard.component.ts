import { Component, OnInit, inject } from '@angular/core';
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
import { DataService } from '../data.service';

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
export class DashboardComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  isUserLoggedIn: any = {status: null};
  userData: DocumentData | null = null;
  uid:any;
  authChecked: boolean = false;
  getDashboardDataSuccess: boolean = false;
  viewProducts:any = [];
  productListing  = [
    {
      image: 'assets/headphone-product.png',
      title: 'HEADPHONE SAMPLE',
      description:'Headphones are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$110.00',
      type: 'modern'
    },
    {
      image: 'assets/airpods-pro.png',
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
      image: 'assets/airpods-pro.png',
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
      image: 'assets/cherry-pods.png',
      title: 'Cherry Airpods',
      description:'Cherry Airpods are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$160.00',
      type: 'modern'
    },
    {
      image: 'assets/purple-bank.png',
      title: 'Purple PowerBank',
      description:'Power Bank are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$160.00',
      type: 'modern'
    },
    {
      image: 'assets/pink-bank.png',
      title: 'Pink PowerBank',
      description:'Pink Bank are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$190.00',
      type: 'sport'
    },
    {
      image: 'assets/purple-max.png',
      title: 'Purple Airpod',
      description:'Pink Bank are electronic audio device that people wear over their ears. They let people hear sounds on a walkman, MP3 player, mobile phone or computer',
      price: '$190.00',
      type: 'sport'
    },
  ];

  constructor(private auth: Auth, private dataService: DataService){
    this.getDashboardDataSuccess = true
    this.auth.onAuthStateChanged((user)=> {
      console.log(user);
      if(user){
        this.uid = user.uid;
        this.isUserLoggedIn.status = 'login';
        this.getUserData();
      } else {
        this.isUserLoggedIn.status = 'logout';
        this.getDashboardDataSuccess = false;
      }
      this.authChecked = true; 
    })
  }

  ngOnInit(): void {
    this.getAllProducts();
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

  async getAllProducts() {
    try {
      this.viewProducts = await this.dataService.getAllProductsList();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  changeItems(itemsInCart:any){
    console.log('itemsInCart',itemsInCart)
  }
}
