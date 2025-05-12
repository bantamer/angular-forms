import { Component, input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[app-row]',
  standalone: true,
  template: `
    @for (col of columns(); track col) {
      <td class="px-2 py-1">{{ row()?.[col] }}</td>
    }
  `,
})
export class GridRowComponent {
  public row = input<Record<string, string | number>>();
  public columns = input<string[]>();
}
