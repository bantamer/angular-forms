import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import { User } from 'users/users.component';

import { provideActivatedRouteMock } from './grid-strategy/query-strategy.mock';

describe('GridComponent', () => {
  let component: GridComponent<User>;
  let fixture: ComponentFixture<GridComponent<User>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridComponent],
      providers: [provideActivatedRouteMock()],
    }).compileComponents();

    fixture = TestBed.createComponent(GridComponent<User>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
