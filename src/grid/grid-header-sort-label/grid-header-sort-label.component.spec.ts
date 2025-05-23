import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridHeaderSortLabelComponent } from './grid-header-sort-label.component';

import {
  COLUMN_RETURN_MOCK,
  GridServiceMock,
  ITest,
  provideGridServiceMock,
} from 'grid/grid-service/grid.service.mock';
import { provideActivatedRouteMock } from 'grid/grid-strategy/query-strategy.mock';
import { Component, viewChild } from '@angular/core';
import { Column, GridService } from 'grid/grid-service/grid.service';
import { SORT_RETURN_MOCK } from 'grid/grid-strategy/grid-strategy.mock';
import { Order } from 'grid/grid-strategy/grid-strategy';

@Component({
  standalone: true,
  template: `<app-grid-header-sort-label [column]="columnMock" />`,
  imports: [GridHeaderSortLabelComponent<ITest>],
})
class TestHostComponent {
  public columnMock: Column<ITest> = COLUMN_RETURN_MOCK;

  public sortLabelComponent = viewChild(GridHeaderSortLabelComponent<ITest>);
}

describe(GridHeaderSortLabelComponent.name, () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideGridServiceMock(), provideActivatedRouteMock()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should display downward arrow when order is asc', () => {
    const grid = TestBed.inject(GridService) as GridServiceMock<ITest>;

    grid.setSortMock({ ...SORT_RETURN_MOCK, order: Order.Asc });

    expect(
      fixture.componentInstance.sortLabelComponent()?.currentOrderIcon(),
    ).toBe('▼');
  });

  it('should display upward arrow when order is desc', () => {
    const grid = TestBed.inject(GridService) as GridServiceMock<ITest>;

    grid.setSortMock({ ...SORT_RETURN_MOCK, order: Order.Desc });

    expect(
      fixture.componentInstance.sortLabelComponent()?.currentOrderIcon(),
    ).toBe('▲');
  });
});
