import { TestBed } from '@angular/core/testing';

import {
  PAGINATION_RETURN_MOCK,
  provideQueryStrategyMock,
  SORT_RETURN_MOCK,
} from 'grid/grid-strategy/grid-strategy.mock';
import { Strategy } from 'grid/grid-strategy/grid-strategy';
import { QueryStrategyMock } from 'grid/grid-strategy/query-strategy.mock';
import { GridService, provideGridService } from './grid.service';
import { COLUMN_RETURN_MOCK } from './grid.service.mock';

interface ITest {
  id: number;
}

describe(GridService.name, () => {
  let service: GridService<ITest>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideGridService(), provideQueryStrategyMock()],
    });
    service = TestBed.inject(GridService<ITest>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('onSortColumnClick: should update currentSort based on strategy response', () => {
    service.onSortColumnClick(COLUMN_RETURN_MOCK);

    const currentSort = service.getCurrentSort()();

    expect(currentSort).toEqual(SORT_RETURN_MOCK);
  });

  it('getPaginationStatus: should return early if page or pageSize is undefined', () => {
    const strategy = TestBed.inject(Strategy) as QueryStrategyMock<ITest>;
    strategy.setInitialPaginationMock({ page: undefined, pageSize: undefined });
    // @ts-expect-error: 'currentPagination' is private and accessed during GridService initialization
    service.currentPagination.set(strategy.getInitialPagination());

    const paginationStatus = service.getPaginationStatus();

    expect(paginationStatus).toBeUndefined();
  });

  it('nextPage: should update currentPagination based on strategy response', () => {
    service.nextPage();

    const currentPagination = service.getCurrentPagination()();

    expect(currentPagination).toEqual(PAGINATION_RETURN_MOCK);
  });

  it('prevPage: should update currentPagination based on strategy response', () => {
    service.prevPage();

    const currentPagination = service.getCurrentPagination()();

    expect(currentPagination).toEqual(PAGINATION_RETURN_MOCK);
  });
});
