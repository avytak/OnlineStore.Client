import { Injectable, inject, DestroyRef } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ApiAuthService } from '@shared/services/api/api-auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoginComponent } from '@features/auth/login/login.component';

@Injectable({ providedIn: 'root' })
export class AuthUiService {
  private dialogService = inject(DialogService);
  private apiAuth = inject(ApiAuthService);
  private destroyRef = inject(DestroyRef);

  openLoginDialog(): void {
    this.dialogService
      .open(LoginComponent, {
        modal: true,
        closable: true,
      })
      .onClose.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const { email, password } = result;
          this.apiAuth.registerUser(email, password).subscribe();
        }
      });
  }
}
