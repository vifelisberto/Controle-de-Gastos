import { MonthExpenses } from './app/home/month-expense'

export let dataFake = {
  dataMonthExpenses: {
    months: [[], [], [], [], [], [], [], [], [], [], [], []],
  } as MonthExpenses,
}

export enum category {
  education = 1,
  recreation,
  food,
  transport,
  cheers,
  householdExpenses,
  others
}

export enum repeat {
  notRepeat = 1,
  monthly,
  portion
}