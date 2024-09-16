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
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
}
