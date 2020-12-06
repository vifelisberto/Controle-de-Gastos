import { element } from 'protractor'
import { DataExpensesService } from 'src/app/services/data-expenses.service'
import { MonthExpenses } from './../../home/month-expense'
import { MonthYear } from './../month-year-select/month-year'
import { ExpenseItem } from './../expense-items/expense-item'
import { Component, OnInit, ViewChild } from '@angular/core'
import { Chart } from 'chart.js'

@Component({
  selector: 'app-analysis-expenses',
  templateUrl: './analysis-expenses.component.html',
  styleUrls: ['./analysis-expenses.component.css'],
})
export class AnalysisExpensesComponent implements OnInit {
  @ViewChild('barChart') barChart
  @ViewChild('lineCanvas') lineCanvas
  @ViewChild('pieCanvas') pieCanvas
  @ViewChild('doughnutCanvas') doughnutCanvas

  lineChart: any
  pieChart: any
  doughnutChart: any
  expenseItem: ExpenseItem[]
  expensePromisse

  bars: any
  colorArray: any

  public readonly months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  constructor(private dataExpensesService: DataExpensesService) {
    this.expensePromisse = this.fillExpense()
  }

  ngOnInit(): void {}
  async fillExpense() {
    this.expenseItem = await this.dataExpensesService.getExpensesByMonthAndYear(
      { month: 0, year: 2020 },
    )
  }

  async ionViewDidEnter() {
    this.createBarChart()
    await this.createLineChart()
    this.createPieChart()
    this.createDoughnutChart()
  }

  getSumAllExpensesAnalysis(expenses: ExpenseItem[]) {
    if (expenses) {
      return expenses
        ?.filter(expense => expense.value)
        ?.reduce((sum, x) => sum + x.value, 0.0)
    }

    return 0.0
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ],
        datasets: [
          {
            label: 'Gastos referente ao Ano de 2020',
            data: [200.5, 200, 90, 500, 700, 90, 1000, 500, 400, 300, 700],
            backgroundColor: [
              'rgb(38, 194, 129)',
              'rgb(255, 0, 0)',
              'rgb(20, 0, 255)',
              'rgb(255, 230, 0)',
              'rgb(0, 255, 10)',
              'rgb(60, 0, 70)',
              'rgb(255, 6, 10)',
              'rgb(20, 42, 255)',
              'rgb(255, 230, 87)',
              'rgb(13, 255, 55)',
              'rgb(60, 25, 70)',
              'rgb(255, 99, 99)',
            ],
            borderColor: 'rgb(38, 194, 129)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    })
  }

  async createLineChart() {
    const date = new Date()
    const month1 = date.getMonth()
    const year1 = date.getFullYear()
    const date2 = new Date(date.setMonth(month1 + 1))
    const date3 = new Date(date.setMonth(date.getMonth() + 1))

    const expensesMonthSum1 = this.getSumAllExpensesAnalysis(
      await this.dataExpensesService.getExpensesByMonthAndYear({
        month: month1,
        year: year1,
      }),
    )

    const expensesMonthSum2 = this.getSumAllExpensesAnalysis(
      await this.dataExpensesService.getExpensesByMonthAndYear({
        month: date2.getMonth(),
        year: date2.getFullYear(),
      }),
    )

    const expensesMonthSum3 = this.getSumAllExpensesAnalysis(
      await this.dataExpensesService.getExpensesByMonthAndYear({
        month: date3.getMonth(),
        year: date3.getFullYear(),
      }),
    )

    this.bars = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [
          this.months[month1],
          this.months[date2.getMonth()],
          this.months[date3.getMonth()],
        ],
        datasets: [
          {
            label: 'Gastos no próximo trimestre',
            data: [expensesMonthSum1, expensesMonthSum2, expensesMonthSum3],
            backgroundColor: [
              'rgb(38, 194, 129)',
              'rgb(255, 0, 0)',
              'rgb(20, 0, 255)',
              'rgb(255, 230, 0)',
              'rgb(0, 255, 10)',
              'rgb(60, 0, 70)',
              'rgb(255, 6, 10)',
              'rgb(20, 42, 255)',
              'rgb(255, 230, 87)',
              'rgb(13, 255, 55)',
              'rgb(60, 25, 70)',
              'rgb(255, 99, 99)',
            ],
            borderColor: 'rgb(38, 194, 129)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    })
  }

  /*
  //Aqui está o grafico de linha, 2 na tela de exibição
  createLineChart() {
    this.bars = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março'],
        datasets: [
          {
            label: 'Gastos referente ao Ano de 2020',
            data: [500, 1000, 200],
            backgroundColor: [
              'rgb(38, 194, 129)',
              'rgb(255, 0, 0)',
              'rgb(20, 0, 255)',
              'rgb(255, 230, 0)',
              'rgb(0, 255, 10)',
              'rgb(60, 0, 70)',
              'rgb(255, 6, 10)',
              'rgb(20, 42, 255)',
              'rgb(255, 230, 87)',
              'rgb(13, 255, 55)',
              'rgb(60, 25, 70)',
              'rgb(255, 99, 99)',
            ],
            borderColor: 'rgb(38, 194, 129)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    })
  }*/

  //Aqui está o grafico de pizza, 3 na tela de exibição
  createPieChart() {
    this.bars = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Outubro', 'Novembro'],
        datasets: [
          {
            label: 'Gastos referente ao Ano de 2020',
            data: [500, 1000],
            backgroundColor: ['rgb(255, 0, 0)', 'rgb(20, 0, 255)'],
            borderColor: 'rgb(38, 194, 129)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    })
  }

  //Aqui está o grafico de doughnut, 4 na tela de exibição
  createDoughnutChart() {
    this.bars = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: [
          'Outubro',
          'Novembro',
          'Dezembro',
          'Janeiro',
          'Fevereiro',
          'Março',
        ],
        datasets: [
          {
            label: 'Gastos referente ao Ano de 2020',
            data: [200.5, 200, 90, 500, 700],
            backgroundColor: [
              'rgb(38, 194, 129)',
              'rgb(255, 0, 0)',
              'rgb(20, 0, 255)',
              'rgb(255, 230, 0)',
              'rgb(0, 255, 10)',
              'rgb(60, 0, 70)',
            ],
            borderColor: 'rgb(38, 194, 129)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    })
  }
}
