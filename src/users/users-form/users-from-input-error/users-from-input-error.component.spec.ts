import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFormInputErrorComponent } from './users-from-input-error.component';

describe(UsersFormInputErrorComponent.name, () => {
  let component: UsersFormInputErrorComponent;
  let fixture: ComponentFixture<UsersFormInputErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersFormInputErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersFormInputErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
