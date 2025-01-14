import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherdataComponent } from './teacherdata.component';

describe('TeacherdataComponent', () => {
  let component: TeacherdataComponent;
  let fixture: ComponentFixture<TeacherdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherdataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
