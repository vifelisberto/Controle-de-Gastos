import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisExpensesComponent } from './analysis-expenses.component';

describe('AnalysisExpensesComponent', () => {
  let component: AnalysisExpensesComponent;
  let fixture: ComponentFixture<AnalysisExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
