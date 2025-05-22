import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridHeaderSortLabelComponent } from './grid-header-sort-label.component';

describe('GridHeaderSortLabelComponent', () => {
  let component: GridHeaderSortLabelComponent;
  let fixture: ComponentFixture<GridHeaderSortLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridHeaderSortLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GridHeaderSortLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
