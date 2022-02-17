import { Component, HostBinding, Inject, Input, OnInit, TemplateRef } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { OffcanvasAnimationMeta } from './offcanvas-animation-meta';
import { OffcanvasPosition } from './offcanvas-position';

@Component({
  selector: 'app-offcanvas',
  templateUrl: './offcanvas.component.html',
  styleUrls: ['./offcanvas.component.scss']
})
export class BsOffcanvasComponent {

  constructor(@Inject('OFFCANVAS_CONTENT') content: TemplateRef<any>) {
    this.content = content;
    this.offcanvasClass$ = this.position$
      .pipe(map((pos) => `offcanvas-${pos}`));
    this.offcanvasHeight100$ = this.position$
      .pipe(map((pos) => {
        switch (this.position) {
          case 'top':
          case 'bottom':
            return false;
          default:
            return true;
        }
      }));
  }

  @Input() public size: number | null = null;
  @HostBinding('class.d-block') displayBlock = true;
  @HostBinding('class.position-absolute') positionAbsolute = true;
  @HostBinding('class.w-100') width100 = true;

  content: TemplateRef<any>;
  private instance: OffcanvasAnimationMeta | null = null;
  
  show$ = new BehaviorSubject<boolean>(false);
  position$ = new BehaviorSubject<OffcanvasPosition>('bottom');
  offcanvasClass$: Observable<string>;
  offcanvasHeight100$: Observable<boolean>;

  //#region Position
  public set position(value: OffcanvasPosition) {
    this.position$.next(value);
  }
  public get position() {
    return this.position$.value;
  }
  //#endregion

}
