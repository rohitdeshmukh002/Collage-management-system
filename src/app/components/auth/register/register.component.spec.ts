import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    
    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatDividerModule
      ],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with empty form and default values', () => {
      expect(component.registerForm.get('email')?.value).toBe('');
      expect(component.registerForm.get('password')?.value).toBe('');
      expect(component.hidePassword).toBeTrue();
      expect(component.loading).toBeFalse();
      expect(component.passwordStrength).toBe('weak');
    });
  });

  describe('Password Strength Calculation', () => {
    it('should return weak for empty password', () => {
      expect(component.calculatePasswordStrength('')).toBe('weak');
    });

    it('should calculate weak password strength correctly', () => {
      expect(component.calculatePasswordStrength('weak')).toBe('weak');
      expect(component.calculatePasswordStrength('Weak1')).toBe('weak');
      expect(component.calculatePasswordStrength('ab')).toBe('weak');
    });

    it('should calculate medium password strength correctly', () => {
      // 2-3 criteria met
      expect(component.calculatePasswordStrength('Weakpass1')).toBe('medium');
      expect(component.calculatePasswordStrength('Weak@1')).toBe('medium');
      expect(component.calculatePasswordStrength('abcABC123')).toBe('medium');
    });

    it('should calculate strong password strength correctly', () => {
      // 4-5 criteria met
      expect(component.calculatePasswordStrength('StrongP@ss1')).toBe('strong');
      expect(component.calculatePasswordStrength('V3ryStr@ng')).toBe('strong');
      expect(component.calculatePasswordStrength('Abcd@1234')).toBe('strong');
    });

    it('should test all strength criteria individually', () => {
      // Test length
      expect(component.calculatePasswordStrength('abcdefgh')).toBe('weak');
      
      // Test uppercase
      expect(component.calculatePasswordStrength('ABCDEF')).toBe('weak');
      
      // Test lowercase
      expect(component.calculatePasswordStrength('abcdef')).toBe('weak');
      
      // Test numbers
      expect(component.calculatePasswordStrength('123456')).toBe('weak');
      
      // Test special characters
      expect(component.calculatePasswordStrength('@#$%^&')).toBe('weak');
    });
  });

  describe('Password Visibility', () => {
    it('should toggle password visibility for password field', () => {
      expect(component.hidePassword).toBeTrue();
      component.togglePasswordVisibility('password');
      expect(component.hidePassword).toBeFalse();
      component.togglePasswordVisibility('password');
      expect(component.hidePassword).toBeTrue();
    });

    it('should not toggle visibility for non-password fields', () => {
      const initialState = component.hidePassword;
      component.togglePasswordVisibility('email');
      expect(component.hidePassword).toBe(initialState);
    });
  });

  describe('Form Validation', () => {
    it('should validate email requirements', () => {
      const emailControl = component.registerForm.get('email');
      
      emailControl?.setValue('');
      expect(emailControl?.errors?.['required']).toBeTruthy();
      
      emailControl?.setValue('invalid-email');
      expect(emailControl?.errors?.['email']).toBeTruthy();
      
      emailControl?.setValue('valid@email.com');
      expect(emailControl?.valid).toBeTrue();
    });

    it('should validate password requirements', () => {
      const passwordControl = component.registerForm.get('password');
      
      passwordControl?.setValue('');
      expect(passwordControl?.errors?.['required']).toBeTruthy();
      
      passwordControl?.setValue('short');
      expect(passwordControl?.errors?.['minlength']).toBeTruthy();
      
      passwordControl?.setValue('nouppercase123@');
      expect(passwordControl?.errors?.['pattern']).toBeTruthy();
      
      passwordControl?.setValue('ValidP@ss1');
      expect(passwordControl?.valid).toBeTrue();
    });
  });

  describe('Form Submission', () => {
    it('should handle valid form submission', () => {
      spyOn(console, 'log');
      const testEmail = 'test@example.com';
      const testPassword = 'ValidP@ss1';
      
      component.registerForm.setValue({
        email: testEmail,
        password: testPassword
      });

      component.onSubmit();

      expect(authService.register).toHaveBeenCalledWith(testEmail, testPassword);
      expect(component.registerForm.value).toEqual({ email: '', password: '' });
      expect(component.loading).toBeFalse();
      expect(console.log).toHaveBeenCalledWith('Form Values:', { email: testEmail, password: testPassword });
    });

    it('should handle invalid form submission', () => {
      spyOn(console, 'log');
      
      component.onSubmit();

      expect(console.log).toHaveBeenCalledWith('Form is invalid');
      expect(authService.register).not.toHaveBeenCalled();
    });

    it('should mark all fields as touched on invalid submission', () => {
      component.onSubmit();
      
      Object.keys(component.registerForm.controls).forEach(key => {
        expect(component.registerForm.get(key)?.touched).toBeTrue();
      });
    });
  });

  describe('Password Strength Monitoring', () => {
    it('should update password strength on value changes', fakeAsync(() => {
      component.ngOnInit();
      
      component.registerForm.get('password')?.setValue('WeakP@ss1');
      tick();
      expect(component.passwordStrength).toBe('strong');

      component.registerForm.get('password')?.setValue('weak');
      tick();
      expect(component.passwordStrength).toBe('weak');
    }));
  });
});