import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterContentInit {

  constructor(private el: ElementRef) { }

  public ngAfterContentInit() {

    setTimeout(() => {

        this.el.nativeElement.focus();

    }, 500);

}

}
