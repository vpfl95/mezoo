import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcgHistoryComponent } from './ecg-history.component';

describe('EcgHistoryComponent', () => {
  let component: EcgHistoryComponent;
  let fixture: ComponentFixture<EcgHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcgHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcgHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
