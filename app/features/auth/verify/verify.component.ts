import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiAuthService } from '@shared/services/api/api-auth.service';
import { VerifyResponse } from '@shared/interfaces/auth-responses';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify',
  imports: [CommonModule],
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
  standalone: true
})
export class VerifyComponent implements OnInit {
  public verificationStatus: 'loading' | 'success' | 'error' = 'loading';
  public message: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiAuthService: ApiAuthService
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    const id = this.route.snapshot.queryParamMap.get('id');

    if (!code || !id) {
      this.verificationStatus = 'error';
      this.message = 'Invalid verification link.';
      return;
    }

    this.apiAuthService.verifyUser(code, id).subscribe({
      next: (res: VerifyResponse) => {
        if (res.success) {
          this.verificationStatus = 'success';
          this.message = 'Your email has been successfully verified. You can now log in.';
        } else {
          this.verificationStatus = 'error';
          this.message = res.message || 'Verification failed. Please try again later.';
        }
      },
      error: () => {
        this.verificationStatus = 'error';
        this.message = 'Verification failed. Please try again later.';
      }
    });
  }

  public goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
