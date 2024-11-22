import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth, User } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { ItemsProgressCartComponent } from '../items-progress-cart/items-progress-cart.component';
import { Country, MatSelectCountryModule } from '@angular-material-extensions/select-country';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [MatIconModule,MatBadgeModule,CommonModule, MatSelectCountryModule],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.scss'
})
export class TopNavbarComponent {
  @Input() isUserLoggedIn:any = {status: null};
  @Input() userData:any;
  currentCount:any;
  isLiked:boolean = false;
  predefinedCountries: Country[] = [
    {
      name: 'Germany',
      alpha2Code: 'DE',
      alpha3Code: 'DEU',
      numericCode: '276',
      callingCode: '+49'
    },
    {
      name: 'Greece',
      alpha2Code: 'GR',
      alpha3Code: 'GRC',
      numericCode: '300',
      callingCode: '+30'
    },
    {
      name: 'France',
      alpha2Code: 'FR',
      alpha3Code: 'FRA',
      numericCode: '250',
      callingCode: '+33'
    },
    {
      name: 'Belgium',
      alpha2Code: 'BE',
      alpha3Code: 'BEL',
      numericCode: '056',
      callingCode: '+32'
    }
  ];
  constructor(private dataService: DataService, private router: Router, private auth: Auth,public dialog: MatDialog){

  }
  ngOnInit(): void {
    this.dataService.$totalProductCount.subscribe(
      count => this.currentCount = count
    );
  }

  onCountrySelected(event: any): void {
    console.log('Selected Country:', event);
  }

  refreshComponent(){
    window.location.reload();
  }

  async logout(){
    await this.auth.signOut();
    this.router.navigate(['/login'])
  }

  login(){
    this.router.navigate(['/login'])
  }

  register(){
    this.router.navigate(['/signup'])
  }
  
  showAddToCartItems(){
    this.dialog.open(ItemsProgressCartComponent);
  }

}
