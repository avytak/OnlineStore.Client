import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from '@shared/constants/app-routing.constants';
import { UiKitModule } from '@shared/ui-kit/ui-kit.module';

@Component({
  selector: 'app-discover-button',
  imports: [UiKitModule, RouterModule],
  templateUrl: './discover-button.component.html',
  styleUrl: './discover-button.component.scss'
})
export class DiscoverButtonComponent {
  public ROUTES = ROUTES;
}
