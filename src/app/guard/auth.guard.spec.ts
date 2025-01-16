import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';

describe('AuthGuard', () => {
  let guard: authGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let routeSnapshot: ActivatedRouteSnapshot;
  let stateSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    // Create mock services using Jasmine spies
    authService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    // Create route snapshots
    routeSnapshot = {} as ActivatedRouteSnapshot;
    stateSnapshot = {
      url: '/protected'
    } as RouterStateSnapshot;

    TestBed.configureTestingModule({
      providers: [
        authGuard,
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });

    guard = TestBed.inject(authGuard);
  });

  // afterEach(() => {
  //   jasmine.resetAllMocks();
  // });

  it('should be created', () => {
    expect(guard).toBeDefined();
  });

  it('should return true when user is logged in', () => {
    // Arrange
    authService.isLoggedIn.and.returnValue(true);

    // Act
    const result = guard.canActivate(routeSnapshot, stateSnapshot);

    // Assert
    expect(result).toBe(true);
    expect(authService.isLoggedIn).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should return false and redirect to root when user is not logged in', () => {
    // Arrange
    authService.isLoggedIn.and.returnValue(false);

    // Act
    const result = guard.canActivate(routeSnapshot, stateSnapshot);

    // Assert
    expect(result).toBe(false);
    expect(authService.isLoggedIn).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should handle route with params', () => {
    // Arrange
    const routeWithParams = {
      params: { id: '123' }
    } as unknown as ActivatedRouteSnapshot;
    authService.isLoggedIn.and.returnValue(true);

    // Act
    const result = guard.canActivate(routeWithParams, stateSnapshot);

    // Assert
    expect(result).toBe(true);
    expect(authService.isLoggedIn).toHaveBeenCalled();
  });

  it('should handle different route states', () => {
    // Arrange
    const differentState = {
      url: '/different-route'
    } as RouterStateSnapshot;
    authService.isLoggedIn.and.returnValue(true);

    // Act
    const result = guard.canActivate(routeSnapshot, differentState);

    // Assert
    expect(result).toBe(true);
    expect(authService.isLoggedIn).toHaveBeenCalled();
  });

  it('should handle error from isLoggedIn', () => {
    // Arrange
    authService.isLoggedIn.and.throwError('Auth failed');

    // Act & Assert
    expect(() => {
      guard.canActivate(routeSnapshot, stateSnapshot);
    }).toThrowError('Auth failed');
    expect(authService.isLoggedIn).toHaveBeenCalled();
  });

  it('should return false when isLoggedIn throws an error', () => {
    // Arrange
    authService.isLoggedIn.and.throwError('Auth failed');

    try {
      // Act
      guard.canActivate(routeSnapshot, stateSnapshot);
    } catch (error) {
      // Assert
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    }
  });
});
