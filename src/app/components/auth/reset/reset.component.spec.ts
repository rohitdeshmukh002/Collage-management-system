import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ResetComponent } from './reset.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('ResetComponent', () => {
  let component: ResetComponent;
  let fixture: ComponentFixture<ResetComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['forgotPassword']);
    
    await TestBed.configureTestingModule({
      imports: [
        ResetComponent,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule
      ],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.forgotPasswordForm.get('email')?.value).toBe('');
    expect(component.loading).toBeFalse();
  });

  it('should validate required email', () => {
    const emailControl = component.forgotPasswordForm.get('email');
    expect(emailControl?.valid).toBeFalse();
    expect(emailControl?.errors?.['required']).toBeTrue();
  });

  it('should validate email format', () => {
    const emailControl = component.forgotPasswordForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.errors?.['email']).toBeTrue();
    
    emailControl?.setValue('valid@email.com');
    expect(emailControl?.valid).toBeTrue();
  });

  it('should mark form as touched when submitting invalid form', () => {
    spyOn(component.forgotPasswordForm, 'markAllAsTouched');
    component.onSubmit();
    expect(component.forgotPasswordForm.markAllAsTouched).toHaveBeenCalled();
    expect(component.loading).toBeFalse();
  });

  it('should handle successful password reset request', fakeAsync(() => {
    const testEmail = 'test@example.com';
    authService.forgotPassword.and.returnValue(Promise.resolve());
    spyOn(window, 'alert');

    component.forgotPasswordForm.get('email')?.setValue(testEmail);
    component.onSubmit();

    expect(component.loading).toBeTrue();

    tick();

    expect(authService.forgotPassword).toHaveBeenCalledWith(testEmail);
    expect(window.alert).toHaveBeenCalledWith('Password reset email sent successfully. Check your inbox.');
    expect(component.loading).toBeFalse();
  }));

  it('should handle failed password reset request', fakeAsync(() => {
    const testEmail = 'test@example.com';
    const error = new Error('Test error');
    authService.forgotPassword.and.returnValue(Promise.reject(error));
    spyOn(window, 'alert');

    component.forgotPasswordForm.get('email')?.setValue(testEmail);
    component.onSubmit();

    expect(component.loading).toBeTrue();

    tick();

    expect(authService.forgotPassword).toHaveBeenCalledWith(testEmail);
    expect(window.alert).toHaveBeenCalledWith('Failed to send password reset email. Error: Test error');
    expect(component.loading).toBeFalse();
  }));

  it('should not call auth service if form is invalid', () => {
    component.forgotPasswordForm.get('email')?.setValue('invalid-email');
    component.onSubmit();
    expect(authService.forgotPassword).not.toHaveBeenCalled();
  });

  it('should set loading state correctly during form submission', fakeAsync(() => {
    const testEmail = 'test@example.com';
    authService.forgotPassword.and.returnValue(Promise.resolve());

    component.forgotPasswordForm.get('email')?.setValue(testEmail);
    expect(component.loading).toBeFalse();

    component.onSubmit();
    expect(component.loading).toBeTrue();

    tick();
    expect(component.loading).toBeFalse();
  }));
});