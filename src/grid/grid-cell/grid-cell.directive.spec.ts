import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridCellDirective } from './grid-cell.directive';

@Component({
  template: `<ng-template appCell></ng-template>`,
  standalone: true,
  imports: [GridCellDirective],
})
class TestHostComponent {}

describe('GridCellDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create directive instance', () => {
    const directives = fixture.debugElement.queryAllNodes(
      (node) => node.injector.get(GridCellDirective, null) !== null,
    );
    expect(directives.length).toBeGreaterThan(0);
  });
});
