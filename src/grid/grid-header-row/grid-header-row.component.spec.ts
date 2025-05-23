import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridHeaderRowComponent } from './grid-header-row.component';
import { Column, GridService } from 'grid/grid-service/grid.service';

import { provideActivatedRouteMock } from 'grid/grid-strategy/query-strategy.mock';
import { provideGridServiceMock } from 'grid/grid-service/grid.service.mock';

interface ITest {
  id: number;
}

describe('GridHeaderRowComponent', () => {
  let component: GridHeaderRowComponent;
  let fixture: ComponentFixture<GridHeaderRowComponent>;

  const columns: Column<ITest>[] = [{ key: 'id', label: 'Id' }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridHeaderRowComponent],
      providers: [provideGridServiceMock(), provideActivatedRouteMock()],
    }).compileComponents();

    const grid = TestBed.inject(GridService<ITest>);

    grid.setColumns(columns);

    fixture = TestBed.createComponent(GridHeaderRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
