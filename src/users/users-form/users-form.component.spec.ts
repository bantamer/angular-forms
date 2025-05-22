import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersFormComponent } from './users-form.component';
import { UsersService } from 'users/users-service/users.service';
import { FormGroupDirective } from '@angular/forms';
import {
  MOCK_USERS_SERVICE_PROVIDER,
  UsersServiceMock,
} from 'users/users-service/users.service.mock';
import { User } from 'users/users-service';

describe(UsersFormComponent.name, () => {
  let component: UsersFormComponent;
  let fixture: ComponentFixture<UsersFormComponent>;
  let service: UsersServiceMock;

  const formGroupDirectiveMock = {
    resetForm: jasmine.createSpy('resetForm'),
  } as unknown as FormGroupDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersFormComponent],
      providers: MOCK_USERS_SERVICE_PROVIDER,
    }).compileComponents();

    service = TestBed.inject(UsersService) as UsersServiceMock;

    fixture = TestBed.createComponent(UsersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addUser and reset the form on submit', () => {
    const user: User = {
      uuid: '',
      firstName: 'Jon',
      lastName: 'Doe',
      birthDayAt: new Date('2000-01-01'),
    };

    component.userForm.setValue(user);
    component.onSubmit(formGroupDirectiveMock);

    expect(service.addUserCalls[0]).toEqual(
      jasmine.objectContaining({
        uuid: jasmine.any(String),
        firstName: user.firstName,
        lastName: user.lastName,
        birthDayAt: user.birthDayAt,
      }),
    );
    expect(formGroupDirectiveMock.resetForm).toHaveBeenCalled();
    expect(component.userForm.pristine).toBeTrue();
  });

  it('should call addUser with default values', () => {
    const user = {
      uuid: '',
      firstName: null,
      lastName: null,
      birthDayAt: null,
    };

    // @ts-expect-error userForm is NonNullable
    component.userForm.setValue(user);
    component.onSubmit(formGroupDirectiveMock);

    expect(service.addUserCalls[0]).toEqual(
      jasmine.objectContaining({
        uuid: jasmine.any(String),
        firstName: '',
        lastName: '',
      }),
    );
    expect(formGroupDirectiveMock.resetForm).toHaveBeenCalled();
    expect(component.userForm.pristine).toBeTrue();
  });
});
