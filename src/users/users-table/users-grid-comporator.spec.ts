import { MatSort } from '@angular/material/sort';
import { User, UserField } from 'users/users-service';
import { v4 as uuidv4 } from 'uuid';
import { Order } from './users-table-sort/types';
import { usersGridComparator } from './users-table.component';

describe('usersGridComparator', () => {
  const mockData: User[] = [
    {
      [UserField.Uuid]: uuidv4(),
      [UserField.FirstName]: 'Aaa',
      [UserField.LastName]: 'Aaa',
      [UserField.BirthDayAt]: new Date('2000-01-01'),
    },
    {
      [UserField.Uuid]: uuidv4(),
      [UserField.FirstName]: 'Bbb',
      [UserField.LastName]: 'Bbb',
      [UserField.BirthDayAt]: new Date('2001-01-01'),
    },
  ];

  it('should return original data', () => {
    const originalData = usersGridComparator([], {
      direction: Order.Asc,
      active: UserField.FirstName,
    } as MatSort);

    expect(originalData).toEqual([]);
  });

  it('should return an array sorted by firstName in descending order', () => {
    const sorted = usersGridComparator(mockData, {
      direction: Order.Desc,
      active: UserField.FirstName,
    } as MatSort);

    expect(sorted[0][UserField.FirstName]).toEqual('Bbb');
  });

  it('should return an array sorted by birthDayAt in descending order', () => {
    const sorted = usersGridComparator(mockData, {
      direction: Order.Desc,
      active: UserField.BirthDayAt,
    } as MatSort);

    expect(sorted[0][UserField.BirthDayAt]).toEqual(new Date('2001-01-01'));
  });
});
