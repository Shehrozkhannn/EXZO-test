import { ChangeDetectorRef, Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth, User } from '@angular/fire/auth';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [MatIconModule,MatBadgeModule,CommonModule],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.scss'
})
export class TopNavbarComponent {
  @Input() isUserLoggedIn:User | null = null;
  @Input() userData:any;
  currentCount:any;
  isLiked:boolean = false;
  constructor(private dataService: DataService, private router: Router, private auth: Auth){

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

  register(){
    this.router.navigate(['/signup'])
  }

}
