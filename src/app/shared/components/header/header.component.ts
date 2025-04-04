import { Component, HostListener } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiKitModule } from '@shared/ui-kit/ui-kit.module';
import { HeaderDesktopComponent } from "./header-desktop/header-desktop.component";
import { HeaderMobileComponent } from "./header-mobile/header-mobile.component";
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule, UiKitModule, HeaderDesktopComponent, HeaderMobileComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [DialogService],
})
export class HeaderComponent {
  public isScrolled: boolean = false;
  public isDesktop: boolean = true;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.breakpointObserver.observe(['(min-width: 990px)']).subscribe(result => {
      if (result.matches) {
        this.isDesktop = true;
      } else {
        this.isDesktop = false;
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 70;
  }
}
