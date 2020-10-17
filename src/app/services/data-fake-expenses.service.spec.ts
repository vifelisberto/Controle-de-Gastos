import { TestBed } from '@angular/core/testing'

import { DataFakeExpensesServiceService } from './data-fake-expenses-service.service'

describe('DataFakeExpensesServiceService', () => {
  let service: DataFakeExpensesServiceService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(DataFakeExpensesServiceService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
