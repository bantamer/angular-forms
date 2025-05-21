import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { User } from './user';

describe(UsersService.name, () => {
  let service: UsersService;

  const mockUser: User = {
    uuid: '123',
    firstName: 'Alice',
    lastName: 'Smith',
    birthDayAt: new Date('1990-01-01'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add user', () => {
    service.addUser(mockUser);
    const users = service.getUsersSignal()();
    expect(users.length).toBe(1);
    expect(users[0]).toEqual(mockUser);
  });

  it('should delete user by uuid', () => {
    service.addUser(mockUser);
    service.deleteUser('123');
    const users = service.getUsersSignal()();
    expect(users.length).toBe(0);
  });
});
