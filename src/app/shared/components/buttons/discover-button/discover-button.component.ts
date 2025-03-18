import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-discover-button',
  imports: [ButtonModule, RouterModule],
  templateUrl: './discover-button.component.html',
  styleUrl: './discover-button.component.scss'
})
export class DiscoverButtonComponent {

}
