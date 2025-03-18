import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { LinkItem } from '../../../interfaces/linkItem';
import { Select } from 'primeng/select';
import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';
import { SubscribeButtonComponent } from "../../buttons/subscribe-button/subscribe-button.component";

@Component({
  selector: 'app-footer-mobile',
  imports: [FormsModule, AccordionModule, CommonModule, InputTextModule, InputGroupModule, ButtonModule, SubscribeButtonComponent],
  templateUrl: './footer-mobile.component.html',
  styleUrl: './footer-mobile.component.scss'
})
export class FooterMobileComponent {
  public email: string = '';
  public selectedCategories: LinkItem | undefined;
  public selectedAboutUs: LinkItem | undefined;

  public categories: LinkItem[] = [
    { name: 'New in', link: '/new-in' },
    { name: 'Brands', link: '/brands' },
    { name: 'Clothing', link: '/clothing' },
    { name: 'Shoes', link: '/shoes' },
    { name: 'Bags', link: '/bags' },
    { name: 'Accessories', link: '/accessories' },
    { name: 'Homeware', link: '/homeware' },
    { name: 'Sale', link: '/sale' }
  ];

  public aboutUsList: LinkItem[] = [
    { name: 'Our history', link: '#' },
    { name: 'Privacy Policy', link: '#' },
    { name: 'Cookie Policy', link: '#' },
    { name: 'Terms & Conditions', link: '#' }
  ]

  public orderingSupportList: LinkItem[] = [
    { name: 'Contact us', link: '#' },
    { name: 'FAQ', link: '#' },
    { name: 'Delivery', link: '#' },
    { name: 'Order history', link: '#' },
    { name: 'Return', link: '#' },
  ]

  submitForm() {
    console.log('Email введено:', this.email);
  }
}
