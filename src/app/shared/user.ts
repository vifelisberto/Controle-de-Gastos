export interface User {
  uuid: string
  birthDate: Date
  city: string
  state: string
  contry: string
  salaryRange: SalaryRange

  dataExpenses: any
}

export enum SalaryRange {
  low = 1, // 1 a 3 salários minimos
  medium = 2, // 4 a 6
  high = 3, // 7 a 9
  extraHigh = 4, // mais de 9
}
