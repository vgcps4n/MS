import {Component, DoCheck, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {OverlayConfig, OverlayRef} from "@angular/cdk/overlay";
import {OverlayService} from "../../overlay/overlay.service";

@Component({
  selector: 'spinner',
  template: `
    <ng-template #spinnerRef>
      <mat-progress-spinner [color]="color"
                            [diameter]="diameter"
                            [mode]="mode"
                            [strokeWidth]="strokeWidth"
                            [value]="value">
      </mat-progress-spinner>
    </ng-template>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, DoCheck {

  @Input() color?: ThemePalette = 'primary';
  @Input() diameter?: number = 50;
  @Input() mode?: ProgressSpinnerMode = 'indeterminate';
  @Input() strokeWidth?: number = 5;
  @Input() value?: number;
  @Input() backdropEnabled = true;
  @Input() positionGloballyCenter = true;
  @Input() displaySpinner: boolean;

  @ViewChild('spinnerRef') private spinnerRef: TemplateRef<any>;
  private spinnerOverlayConfig: OverlayConfig;
  private overlayRef: OverlayRef;

  constructor(private vcRef: ViewContainerRef, private overlayService: OverlayService) { }

  ngOnInit(): void {
    this.spinnerOverlayConfig = {
      hasBackdrop: this.backdropEnabled,
    };

    if (this.positionGloballyCenter) {
      this.spinnerOverlayConfig['positionStrategy'] = this.overlayService.positionGloballyCenter();
    }

    this.overlayRef = this.overlayService.createOverlay(this.spinnerOverlayConfig);
  }

  ngDoCheck(): void {
    if (this.displaySpinner && !this.overlayRef.hasAttached() && this.spinnerRef) {
      this.overlayService.attachTemplatePortal(this.overlayRef, this.spinnerRef, this.vcRef);
    } else if (!this.displaySpinner && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }

}
