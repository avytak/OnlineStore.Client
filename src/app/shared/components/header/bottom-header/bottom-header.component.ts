import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-bottom-header',
  imports: [FormsModule, InputGroup, InputGroupAddonModule, InputTextModule, ButtonModule],
  templateUrl: './bottom-header.component.html',
  styleUrl: './bottom-header.component.scss'
})
export class BottomHeaderComponent {

}
