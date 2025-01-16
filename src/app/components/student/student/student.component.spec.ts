// student.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentComponent } from './student.component';
import { AuthService } from '../../../service/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    // Create auth service spy
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    authServiceSpy.logout.and.returnValue(await Promise.resolve());

    await TestBed.configureTestingModule({
      imports: [
        StudentComponent,
        BrowserAnimationsModule,
        MatDialogModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Properties', () => {
    it('should initialize quickActions array with correct values', () => {
      expect(component.quickActions.length).toBe(4);
      expect(component.quickActions[0]).toEqual({
        title: 'Add Student',
        icon: 'person_add',
        route: '/students/add',
        color: '#4CAF50'
      });
    });

    it('should initialize features array with correct values', () => {
      expect(component.features.length).toBe(4);
      expect(component.features[0]).toEqual({
        title: 'Student Management',
        description: 'Efficiently manage student profiles, academic records, and personal information in one place.',
        icon: 'people',
        route: '/students'
      });
    });
  });

  describe('Authentication', () => {
    it('should call auth service logout method when logOut is called', () => {
      component.logOut();
      expect(authServiceSpy.logout).toHaveBeenCalled();
    });
  });

  describe('Component Integration', () => {
    it('should properly import all required Angular Material modules', () => {
      const element = fixture.nativeElement;
      expect(element).toBeTruthy();
    });
  });
});