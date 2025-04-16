import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { UiKitModule } from '@shared/ui-kit/ui-kit.module';
import { LoginComponent } from '@features/auth/login/login.component';
import { ApiAuthService } from '@shared/services/api/api-auth.service';
import { GENDER_LINKS, MENU_ITEMS } from '@shared/constants/app-routing.constants';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthUiService } from '@shared/services/business/auth-ui.service';

@Component({
  selector: 'app-header-desktop',
  imports: [UiKitModule, RouterModule],
  templateUrl: './header-desktop.component.html',
  styleUrl: './header-desktop.component.scss'
})
export class HeaderDesktopComponent implements OnInit {
  @Input() scrolled: boolean = false;

  public menuItems: MenuItem[] = [];
  public genderLinks = GENDER_LINKS;
  public destroyRef = inject(DestroyRef);

  constructor(
    private dialogService: DialogService,
    private apiAuth: ApiAuthService,
    public authUi: AuthUiService
  ) {}

  ngOnInit() {
    this.menuItems = MENU_ITEMS;
  }

  public openDialog(): void {
    this.authUi.openLoginDialog();
  }

  public openBasket() {
    console.log('Open basket');
  }
}

