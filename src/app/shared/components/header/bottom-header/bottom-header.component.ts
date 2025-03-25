import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiKitModule } from '@shared/ui-kit/ui-kit.module';

@Component({
  selector: 'app-bottom-header',
  imports: [FormsModule, UiKitModule],
  templateUrl: './bottom-header.component.html',
  styleUrl: './bottom-header.component.scss'
})
export class BottomHeaderComponent {

}
