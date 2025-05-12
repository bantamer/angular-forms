import { Component } from '@angular/core';
import { GridComponent } from 'grid/grid.component';

@Component({
  selector: 'app-home',
  imports: [GridComponent],
  template: `<table app-grid></table>`,
  standalone: true,
})
export class HomeComponent {}
