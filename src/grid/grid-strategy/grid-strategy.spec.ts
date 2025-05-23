import { TestBed } from '@angular/core/testing';
import { Strategy } from './grid-strategy';
import { QueryStrategy } from './query-strategy';
import { provideActivatedRouteMock } from './query-strategy.mock';

describe('Strategy InjectionToken', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideActivatedRouteMock()],
    });
  });

  it('should use QueryStrategy as default factory', () => {
    const strategy = TestBed.inject(Strategy);
    expect(strategy).toBeInstanceOf(QueryStrategy);
  });
});
