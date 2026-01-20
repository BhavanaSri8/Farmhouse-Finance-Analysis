import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeDashboard } from './income-dashboard';

describe('IncomeDashboard', () => {
  let component: IncomeDashboard;
  let fixture: ComponentFixture<IncomeDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
