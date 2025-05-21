import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersFormComponent } from './users-form.component';
import { UsersService } from 'users/users-service/users.service';
import { FormGroupDirective } from '@angular/forms';

describe(UsersFormComponent.name, () => {
  let component: UsersFormComponent;
  let fixture: ComponentFixture<UsersFormComponent>;

  const usersServiceMock = {
    addUser: jasmine.createSpy('addUser'),
  };

  const formGroupDirectiveMock = {
    resetForm: jasmine.createSpy('resetForm'),
  } as unknown as FormGroupDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersFormComponent],
      providers: [{ provide: UsersService, useValue: usersServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call addUser and reset the form on submit', () => {
    component.userForm.setValue({
      uuid: '',
      firstName: 'John',
      lastName: 'Doe',
      birthDayAt: new Date('2000-01-01'),
    });

    component.onSubmit(formGroupDirectiveMock);

    expect(usersServiceMock.addUser).toHaveBeenCalled();
    expect(formGroupDirectiveMock.resetForm).toHaveBeenCalled();
    expect(component.userForm.pristine).toBeTrue();
  });
});
