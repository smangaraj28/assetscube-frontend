import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GolddashComponent } from './golddash.component';

describe('GolddashComponent', () => {
  let component: GolddashComponent;
  let fixture: ComponentFixture<GolddashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GolddashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GolddashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
