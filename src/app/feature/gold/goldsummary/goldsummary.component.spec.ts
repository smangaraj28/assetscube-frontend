import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldsummaryComponent } from './goldsummary.component';

describe('GoldsummaryComponent', () => {
  let component: GoldsummaryComponent;
  let fixture: ComponentFixture<GoldsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoldsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
