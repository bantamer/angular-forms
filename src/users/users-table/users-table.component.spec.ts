import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersTableComponent } from './users-table.component';
import {
  MOCK_USERS_SERVICE_PROVIDER,
  UsersServiceMock,
} from 'users/users-service/users.service.mock';
import { UsersService } from 'users/users-service';

describe(UsersTableComponent.name, () => {
  let component: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;
  let service: UsersServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersTableComponent],
      providers: MOCK_USERS_SERVICE_PROVIDER,
    }).compileComponents();

    service = TestBed.inject(UsersService) as UsersServiceMock;

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

    expect(service.deleteUserCalls).toContain(uuid);
  });
});
