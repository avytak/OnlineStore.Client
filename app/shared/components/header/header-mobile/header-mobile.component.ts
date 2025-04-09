import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { GENDER_LINKS, MOBILE_MENU_ITEMS } from '@shared/constants/app-routing.constants';
import { ApiAuthService } from '@shared/services/api/api-auth.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header-mobile',
  imports: [Menu, ButtonModule, CommonModule, FormsModule],
  templateUrl: './header-mobile.component.html',
  styleUrl: './header-mobile.component.scss',
})
export class HeaderMobileComponent implements OnInit {
  @Input() scrolled: boolean = false;

  public menuItems: MenuItem[] = [];
  public genderLinks = GENDER_LINKS;
  public inputVisible: boolean = false;
  public searchText: string = '';

  constructor(
    private dialogService: DialogService,
    private apiAuth: ApiAuthService
  ) {}

  ngOnInit() {
    this.menuItems = MOBILE_MENU_ITEMS;
  }
  toggleInput() {
    this.inputVisible = !this.inputVisible;
  }
}
