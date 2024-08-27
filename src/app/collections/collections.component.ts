import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LearnMoreComponent } from '../learn-more/learn-more.component';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss'
})
export class CollectionsComponent {

  constructor(public dialog: MatDialog) {}
    learnMore(){
      this.dialog.open(LearnMoreComponent)
    }
}
