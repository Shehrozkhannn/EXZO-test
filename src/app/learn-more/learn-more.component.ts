import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-learn-more',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './learn-more.component.html',
  styleUrl: './learn-more.component.scss'
})
export class LearnMoreComponent {

}
