import { TestBed } from '@angular/core/testing';

import { GridService } from './grid.service';

interface GridServiceDataSource {
  Name: string;
}

describe('GridService', () => {
  let service: GridService<GridServiceDataSource>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
