import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appCheckPasswordEqual]',
  standalone: false
})
export class CheckPasswordEqualDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    console.log('asdsadsad');
    const password = this.el.nativeElement.form.querySelector('[name="password"]').value;
    const confirmPassword = this.el.nativeElement.value;

    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        this.renderer.setStyle(this.el.nativeElement, 'border-color', 'red');
        this.el.nativeElement.setCustomValidity('Passwords do not match');
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'border-color', 'green');
        this.el.nativeElement.setCustomValidity('');
      }
    }
  }

}
