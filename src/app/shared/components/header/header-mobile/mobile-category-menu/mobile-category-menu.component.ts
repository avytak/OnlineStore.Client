import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { GENDER_LINKS, MENU_ITEMS } from '@shared/constants/app-routing.constants';
import { SubcategoryMap } from '@shared/interfaces/subcategory';
import { SUBCATEGORIES } from '@shared/data/menu-subcategory';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthUiService } from '@shared/services/business/auth-ui.service';

@Component({
  selector: 'app-mobile-category-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mobile-category-menu.component.html',
  styleUrls: ['./mobile-category-menu.component.scss'],
})
export class MobileCategoryMenuComponent {
  @Input() menuItems: MenuItem[] = MENU_ITEMS;
  @Output() close = new EventEmitter<void>();

  public activeGender: 'her' | 'him'| null = null;
  public selectedCategory: keyof SubcategoryMap | null = null;
  public currentView: 'main' | 'subcategory' = 'main';
  public genderLinks = GENDER_LINKS;
  public subcategories = SUBCATEGORIES;

  constructor (public authUi: AuthUiService){}

  setGender(gender: 'her' | 'him') {
    this.activeGender = gender;
  }

  openSubcategory(category: keyof SubcategoryMap) {
    this.selectedCategory = category;
    this.currentView = 'subcategory';
  }

  backToMain() {
    this.currentView = 'main';
    this.selectedCategory = null;
  }

  closeMenu() {
    this.close.emit();
  }

  sanitizeLabel(label?: string): string {
    return label? label.replace(/<[^>]*>/g, '').trim() : '';
  }
  public openDialog(): void {
    this.authUi.openLoginDialog();
  }

}
