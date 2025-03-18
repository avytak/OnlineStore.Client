import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ApiAuthService } from '../../../services/api/api-auth.service';
import { SignupComponent } from '../../../../features/auth/signup/signup.component';

@Component({
  selector: 'app-top-header',
  imports: [],
  templateUrl: './top-header.component.html',
  styleUrl: './top-header.component.scss',
  providers: [DialogService],
})
export class TopHeaderComponent {
  constructor(
    private dialogService: DialogService,
    private apiAuth: ApiAuthService
  ) {
    // this.openDialog();
  }

  public openDialog(): void {
    const dialogRef = this.dialogService
      .open(SignupComponent, {
        modal: true,
        closable: true,
      })
      .onClose.subscribe((result) => {
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
}
