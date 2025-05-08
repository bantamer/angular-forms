import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFormTextInputComponent } from './users-form-input.component';

describe('UsersFormInputComponent', () => {
  let component: UsersFormTextInputComponent;
  let fixture: ComponentFixture<UsersFormTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersFormTextInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersFormTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
