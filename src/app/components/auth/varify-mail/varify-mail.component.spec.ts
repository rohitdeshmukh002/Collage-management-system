import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarifyMailComponent } from './varify-mail.component';

describe('VarifyMailComponent', () => {
  let component: VarifyMailComponent;
  let fixture: ComponentFixture<VarifyMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VarifyMailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VarifyMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
