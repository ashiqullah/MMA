import { Component, ViewChild, OnInit, Renderer2, Input, ElementRef } from '@angular/core';

/**
 * Generated class for the AccordionComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'accordion',
  templateUrl: 'accordion.html'
})
export class AccordionComponent implements OnInit {

  accordionExapanded = false;
 // @ViewChild("cc", { read: ElementRef }) cardContent: any;
  @ViewChild("cc", { read: ElementRef }) private cardContent: ElementRef;
  @Input('title') title: string;

  icon: string = "arrow-forward";

  constructor(public renderer: Renderer2) {

  }

  ngOnInit() {
    console.log(this.cardContent.nativeElement);
    this.renderer.setStyle(this.cardContent.nativeElement, "webkitTransition", "max-height 500ms, padding 500ms");
  }

  toggleAccordion() {
    if (this.accordionExapanded) {
      this.renderer.setStyle(this.cardContent.nativeElement, "max-height", "0px");
      this.renderer.setStyle(this.cardContent.nativeElement, "padding", "0px 16px");

    } else {
      this.renderer.setStyle(this.cardContent.nativeElement, "max-height", "500px");
      this.renderer.setStyle(this.cardContent.nativeElement, "padding", "13px 16px");

    }

    this.accordionExapanded = !this.accordionExapanded;
    this.icon = this.icon == "arrow-forward" ? "arrow-down" : "arrow-forward";

  }

}
