import { Component } from '@angular/core';
import { SlideUpDownAnimation } from './animations/slide-up-down.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [SlideUpDownAnimation]
})
export class AppComponent {
  title = 'sidebar-overlay-test';
  toggleSidebar() {
    
  }
}
