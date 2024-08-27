import { ChangeDetectorRef, Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [MatIconModule,MatBadgeModule,CommonModule],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.scss'
})
export class TopNavbarComponent {
  currentCount:any;
  isLiked:boolean = false;
  constructor(private dataService: DataService){

  }
  ngOnInit(): void {
    this.dataService.$totalProductCount.subscribe(
      count => this.currentCount = count
    );
  }


  refreshComponent(){
    window.location.reload();
  }

}
