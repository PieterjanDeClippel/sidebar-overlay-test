import { Component, Injector, TemplateRef } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SlideUpDownAnimation } from './animations/slide-up-down.animation';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BsOffcanvasComponent } from './components/offcanvas/offcanvas.component';
import { OffcanvasAnimationMeta } from './components/offcanvas/offcanvas-animation-meta';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [SlideUpDownAnimation]
})
export class AppComponent {
  
  constructor(private parentInjector: Injector, private overlayService: Overlay) {}
  
  title = 'sidebar-overlay-test';

  toggleSidebar(template: TemplateRef<any>) {
    // Add provider which contains the template to be rendered in the offcanvas overlay
    const injector = Injector.create({
      providers: [{ provide: 'OFFCANVAS_CONTENT', useValue: template }],
      parent: this.parentInjector
    });

    // Portal which will hold the offcanvas component
    const portal = new ComponentPortal(BsOffcanvasComponent, null, injector);

    // Create overlay to the left side of  the screen
    const overlay = this.overlayService.create({
      scrollStrategy: this.overlayService.scrollStrategies.reposition(),
      positionStrategy: this.overlayService.position().global()
        .centerVertically().left('0'),
      height: '100%',
      hasBackdrop: true
    });

    // Instantiate the offcanvas. This will resolve the provider,
    // and render the template in the bootstrap 5 offcanvas
    const componentInstance = overlay.attach<BsOffcanvasComponent>(portal);

    // Set bootstrap classes
    componentInstance.instance.position = 'start';

    // Now trigger the animation which shows the sidebar
    setTimeout(() => componentInstance.instance.show$.next(true));

    // Keep the animation information on a private field of the component
    componentInstance.instance['instance'] = <OffcanvasAnimationMeta>{
      component: componentInstance,
      overlay: overlay
    };

    overlay.backdropClick().pipe(take(1)).subscribe(() => {
      componentInstance.instance.show$.next(false);
      setTimeout(() => componentInstance.instance['instance']?.overlay.dispose(), 300);
    });
  }
}
