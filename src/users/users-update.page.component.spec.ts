import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersUpdatePageComponent } from './users-update.page.component';

describe('UsersUpdatePageComponent', () => {
  let component: UsersUpdatePageComponent;
  let fixture: ComponentFixture<UsersUpdatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersUpdatePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
