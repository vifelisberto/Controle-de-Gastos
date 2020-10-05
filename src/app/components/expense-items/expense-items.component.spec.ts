import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseItemsComponent } from './expense-items.component';

describe('ExpenseItemComponent', () => {
  let component: ExpenseItemsComponent;
  let fixture: ComponentFixture<ExpenseItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
