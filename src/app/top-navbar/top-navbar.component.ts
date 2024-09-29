import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth, User } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { ItemsProgressCartComponent } from '../items-progress-cart/items-progress-cart.component';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [MatIconModule,MatBadgeModule,CommonModule],
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
    // this.dataService.cartItems$.subscribe((items) => {
    //   this.cartItems = items;
    // });
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
