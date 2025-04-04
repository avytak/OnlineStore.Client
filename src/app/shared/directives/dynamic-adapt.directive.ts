import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appDynamicAdapt]'
})
export class DynamicAdaptDirective implements OnInit, OnDestroy {
  @Input() appDynamicAdapt: string = '';

  private mediaSubscription: Subscription = Subscription.EMPTY;
  private daClassname = '_dynamic_adapt_';

  constructor(private el: ElementRef, private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    if (this.appDynamicAdapt) {
      this.setupMediaQueries();
    }
  }

  ngOnDestroy() {
    if (this.mediaSubscription) {
      this.mediaSubscription.unsubscribe();
    }
  }

  private setupMediaQueries() {
    this.mediaSubscription = this.breakpointObserver
      .observe([`(max-width: ${this.appDynamicAdapt})`])
      .subscribe((state) => {
        if (state.matches) {
          this.moveElementToDestination();
        } else {
          this.moveElementBack();
        }
      });
  }

  private moveElementToDestination() {
    const data = this.appDynamicAdapt.split(',');
    const destinationSelector = data[0].trim();
    const place = data[2] ? data[2].trim() : 'last';
    const destination = document.querySelector(destinationSelector);

    const placeIndex = place === 'last' ? Number.MAX_SAFE_INTEGER : (place === 'first' ? 0 : parseInt(place));

    if (destination) {
      this.el.nativeElement.classList.add(this.daClassname);

      // Перевіряємо, чи є place числом
      if (placeIndex === Number.MAX_SAFE_INTEGER || placeIndex >= destination.children.length) {
        destination.append(this.el.nativeElement);
      } else if (placeIndex === 0) {
        destination.prepend(this.el.nativeElement);
      } else {
        destination.children[placeIndex].before(this.el.nativeElement);
      }
    }
  }

  private moveElementBack() {
    const parent = this.el.nativeElement.parentNode;
    const index = Array.from(parent.children).indexOf(this.el.nativeElement);

    this.el.nativeElement.classList.remove(this.daClassname);

    if (parent.children[index] !== undefined) {
      parent.children[index].before(this.el.nativeElement);
    } else {
      parent.append(this.el.nativeElement);
    }
  }
}
