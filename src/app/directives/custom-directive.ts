import { Directive, ElementRef, Renderer2, inject, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class HighlightDirective {

  @Input() appHighlight = 'yellow';
  @Input() defaultColor = 'transparent';


  private readonly renderer = inject(Renderer2);
  private readonly el = inject(ElementRef);

  constructor() {
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'background-color 0.3s ease');
  }


  onMouseEnter() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'backgroundColor',
      this.appHighlight
    );
  }

  onMouseLeave() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'backgroundColor',
      this.defaultColor
    );
  }
}
