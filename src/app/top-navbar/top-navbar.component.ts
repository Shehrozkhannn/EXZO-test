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
  constructor(private dataService: DataService, private router: Router, private auth: Auth,public dialog: MatDialog){

  }
  ngOnInit(): void {
    this.dataService.$totalProductCount.subscribe(
      count => this.currentCount = count
    );
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

  navigateToAdminPanel(){
    this.router.navigate(['/admin-panel'])
  }

  register(){
    this.router.navigate(['/signup'])
  }
  
  showAddToCartItems(){
    this.dialog.open(ItemsProgressCartComponent);
  }

}
