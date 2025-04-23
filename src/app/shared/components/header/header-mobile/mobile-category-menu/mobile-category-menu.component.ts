import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { GENDER_LINKS, MENU_ITEMS } from '@shared/constants/app-routing.constants';
import { SubcategoryMap } from '@shared/interfaces/subcategory';
import { SUBCATEGORIES } from '@shared/data/menu-subcategory';
import { AuthUiService } from '@shared/services/business/auth-ui.service';

import { Gender } from '@shared/enums/gender.enum';
import { MenuView } from '@shared/enums/menu-view.enum';
import { DisplayGenderPipe } from '@shared/pipes/display-gender.pipe';

@Component({
  selector: 'app-mobile-category-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, DisplayGenderPipe],
  templateUrl: './mobile-category-menu.component.html',
  styleUrls: ['./mobile-category-menu.component.scss'],
})
export class MobileCategoryMenuComponent {
  @Input() public menuItems: MenuItem[] = MENU_ITEMS;
  @Output() public close = new EventEmitter<void>();

  public Gender: typeof Gender = Gender;
  public MenuView: typeof MenuView = MenuView;

  public activeGender: Gender | null = null;
  public currentView: MenuView = MenuView.Main;
  public selectedCategory: keyof SubcategoryMap | null = null;

  public genderLinks = GENDER_LINKS;
  public subcategories = SUBCATEGORIES;

  constructor(public authUi: AuthUiService) {}

  setGender(gender: Gender): void {
    this.activeGender = gender;
  }

  openSubcategory(label?: string): void {
    const sanitized = label ? label.replace(/<[^>]*>/g, '').trim() : '';
    this.selectedCategory = sanitized as keyof SubcategoryMap;
    this.currentView = MenuView.Subcategory;
  }

  backToMain(): void {
    this.currentView = MenuView.Main;
    this.selectedCategory = null;
  }

  closeMenu(): void {
    this.close.emit();
  }

  openDialog(): void {
    this.authUi.openLoginDialog();
  }
}
