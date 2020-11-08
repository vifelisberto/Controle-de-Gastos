import { TestBed } from '@angular/core/testing'
import { DataExpensesService } from './data-expenses.service'

describe('DataExpensesService', () => {
  let service: DataExpensesService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(DataExpensesService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
