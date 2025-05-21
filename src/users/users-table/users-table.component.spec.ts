import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersTableComponent } from './users-table.component';
import { UsersService } from 'users/users-service';

describe(UsersTableComponent.name, () => {
  let component: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;

  const usersServiceMock = {
    deleteUser: jasmine.createSpy('deleteUser'),
    getUsersSignal: () => () => [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersTableComponent],
      providers: [{ provide: UsersService, useValue: usersServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteUser with given uuid', () => {
    const uuid = 'test-uuid';
    component.onDelete(uuid);
    expect(usersServiceMock.deleteUser).toHaveBeenCalledOnceWith(uuid);
  });
});
