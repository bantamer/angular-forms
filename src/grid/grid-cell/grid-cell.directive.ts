import { Directive, inject, input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appCell]',
  standalone: true,
})
export class GridCellDirective<T> {
  public readonly templateRef = inject(TemplateRef);
  public key = input<keyof T>(undefined, {
    alias: 'appCellKey',
  });
}
