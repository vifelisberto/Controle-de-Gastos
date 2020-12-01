import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { MonthYearSelectComponent } from './month-year-select.component'

describe('MonthYearSelectComponent', () => {
  let component: MonthYearSelectComponent
  let fixture: ComponentFixture<MonthYearSelectComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonthYearSelectComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthYearSelectComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
