import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPaginationComponent } from './grid-pagination.component';
import { Component } from '@angular/core';

@Component({
  template: `<app-grid-pagination [pagination]="pagination" />`,
  standalone: true,
  imports: [GridPaginationComponent],
})
class TestHostComponent {
  pagination = {
    getPaginationStatus: () => ({}),
    nextPage: () => {
      return;
    },
    prevPage: () => {
      return;
    },
  };
}

describe('GridPaginationComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridPaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
