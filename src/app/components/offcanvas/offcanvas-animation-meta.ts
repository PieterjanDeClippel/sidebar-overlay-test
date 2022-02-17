import { OverlayRef } from "@angular/cdk/overlay";
import { ComponentRef } from "@angular/core";
import { BsOffcanvasComponent } from "./offcanvas.component";

export interface OffcanvasAnimationMeta {
    component: ComponentRef<BsOffcanvasComponent>;
    overlay: OverlayRef;
}