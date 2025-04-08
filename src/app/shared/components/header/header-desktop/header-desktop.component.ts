import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { UiKitModule } from '@shared/ui-kit/ui-kit.module';
import { LoginComponent } from '@features/auth/login/login.component';
import { ApiAuthService } from '@shared/services/api/api-auth.service';
import { DESKTOP_MENU_ITEMS, GENDER_LINKS } from '@shared/constants/app-routing.constants';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    private apiAuth: ApiAuthService
  ) {}

  ngOnInit() {
    this.menuItems = DESKTOP_MENU_ITEMS
  }

  public openDialog(): void {
    const dialogRef = this.dialogService
      .open(LoginComponent, {
        modal: true,
        closable: true,
      })
      .onClose
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const { email, password } = result;
          this.apiAuth.registerUser(email, password).subscribe({
            next: (response) => {
              console.log('Користувач успішно зареєстрований', response);
            },
            error: (error) => {
              console.error('Помилка реєстрації', error);
            },
          });
        }
      });
  }

  public openBasket() {
    console.log('Open basket');
  }
}

