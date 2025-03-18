import { Component } from '@angular/core';
import { DiscoverButtonComponent } from "../../../../shared/components/buttons/discover-button/discover-button.component";


@Component({
  selector: 'app-hero-banner',
  imports: [DiscoverButtonComponent],
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.scss'
})
export class HeroBannerComponent {

}
