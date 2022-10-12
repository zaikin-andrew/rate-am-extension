import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  template: ''
})
export abstract class GlbUnsubscribe implements OnDestroy {

  protected unsubscribe: Subject<void> = new Subject();

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
