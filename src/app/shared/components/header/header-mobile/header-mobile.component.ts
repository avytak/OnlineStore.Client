import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { GENDER_LINKS, MENU_ITEMS } from '@shared/constants/app-routing.constants';
import { ApiAuthService } from '@shared/services/api/api-auth.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UiKitModule } from 'dist/online-store/browser/app/shared/ui-kit/ui-kit.module';
import { MobileCategoryMenuComponent } from './mobile-category-menu/mobile-category-menu.component';

@Component({
  selector: 'app-header-mobile',
  standalone: true,
  imports: [ButtonModule, CommonModule, FormsModule, UiKitModule, RouterModule, MobileCategoryMenuComponent],
  templateUrl: './header-mobile.component.html',
  styleUrl: './header-mobile.component.scss',
})
export class HeaderMobileComponent implements OnInit {
  @Input() scrolled: boolean = false;

  public menuItems: MenuItem[] = [];
  public genderLinks = GENDER_LINKS;
  public inputVisible: boolean = false;
  public searchText: string = '';
  public menuOpen = false;

  constructor(
    private dialogService: DialogService,
    private apiAuth: ApiAuthService
  ) {}

  ngOnInit() {
    this.menuItems = MENU_ITEMS;
  }

  toggleInput() {
    this.inputVisible = !this.inputVisible;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  onSearch() {
    if (this.searchText.trim()) {
      console.log('Searching for:', this.searchText);
    }
  }

  clearSearch() {
    this.searchText = '';
    this.inputVisible = false;
  }

}
