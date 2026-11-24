import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_URL } from './api';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token();
  const ehNossaApi = req.url.startsWith(API_URL);

  // Login não precisa de token; chamadas para outros domínios também não.
  if (!token || !ehNossaApi || req.url.endsWith('/auth/login')) {
    return next(req);
  }

  const comToken = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
  return next(comToken);
};
