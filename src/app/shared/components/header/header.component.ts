import { Component, Input } from '@angular/core';
import { TopHeaderComponent } from "./top-header/top-header.component";
import { BottomHeaderComponent } from "./bottom-header/bottom-header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, TopHeaderComponent, BottomHeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() isScrolled = false;

}
