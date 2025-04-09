import { AfterViewInit, Component, DestroyRef, HostListener, inject } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogService } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiKitModule } from '@shared/ui-kit/ui-kit.module';
import { HeaderDesktopComponent } from "./header-desktop/header-desktop.component";
import { HeaderMobileComponent } from "./header-mobile/header-mobile.component";

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule, UiKitModule, HeaderDesktopComponent, HeaderMobileComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [DialogService],
})
export class HeaderComponent implements AfterViewInit {
  public isScrolled = false;
  public isDesktop = true;
  private destroyRef = inject(DestroyRef);

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.onWindowScroll();

      this.breakpointObserver
        .observe(['(min-width: 990px)'])
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((result: BreakpointState) => {
          this.isDesktop = result.matches;
        });
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 70;
  }
}
