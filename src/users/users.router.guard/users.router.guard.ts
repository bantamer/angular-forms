import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { UsersService } from 'users/users-service';

export const userExistGuard: CanActivateFn = ({ paramMap }) => {
  const uuid = paramMap.get('uuid')!;
  const users = inject(UsersService);
  const redirectToNotFoundPath = new RedirectCommand(
    inject(Router).createUrlTree(['not-found']),
  );

  return users.getUser(uuid).pipe(
    map((user) => !!user || redirectToNotFoundPath),
    catchError(() => of(redirectToNotFoundPath)),
  );
};
