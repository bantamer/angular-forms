import { Component, viewChild } from '@angular/core';
import { GridPaginationDirective } from './grid-pagination.directive';
import { GridService } from 'grid/grid-service/grid.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideActivatedRouteMock } from 'grid/grid-strategy/query-strategy.mock';
import {
  GridServiceMock,
  ITest,
  provideGridServiceMock,
} from 'grid/grid-service/grid.service.mock';

@Component({
  selector: 'app-test-host',
  template: `<div></div>`,
  standalone: true,
  providers: [provideGridServiceMock()],
})
class TestHostComponent {}

@Component({
  template: `<app-test-host appGridPagination></app-test-host>`,
  standalone: true,
  imports: [TestHostComponent, GridPaginationDirective],
})
class TestDirectiveComponent {
  public gridPaginationDirective = viewChild(GridPaginationDirective);
  public grid = viewChild(GridService);
}

describe('GridPaginationDirective', () => {
  let fixture: ComponentFixture<TestDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDirectiveComponent],
      providers: [provideActivatedRouteMock()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestDirectiveComponent);
    fixture.detectChanges();
  });

  it('should create directive instance', () => {
    expect(fixture.componentInstance.gridPaginationDirective()).toBeTruthy();
  });

  it('should call nextPage in GridService', () => {
    const grid = fixture.componentInstance.grid() as
      | GridServiceMock<ITest>
      | undefined;

    fixture.componentInstance.gridPaginationDirective()?.nextPage();
    expect(grid?.nextPageCalls.length).toBeGreaterThan(0);
  });

  it('should call nextPage in GridService', () => {
    const grid = fixture.componentInstance.grid() as
      | GridServiceMock<ITest>
      | undefined;

    fixture.componentInstance.gridPaginationDirective()?.prevPage();
    expect(grid?.prevPageCalls.length).toBeGreaterThan(0);
  });
});
