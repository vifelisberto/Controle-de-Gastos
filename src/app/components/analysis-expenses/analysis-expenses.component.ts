import { DataExpensesService } from 'src/app/services/data-expenses.service'
import { ExpenseItem } from './../expense-items/expense-item'
import { Component, ViewChild } from '@angular/core'
import { Chart } from 'chart.js'
import Swiper, { SwiperOptions } from 'swiper'

@Component({
  selector: 'app-analysis-expenses',
  templateUrl: './analysis-expenses.component.html',
  styleUrls: ['./analysis-expenses.component.scss'],
})
export class AnalysisExpensesComponent {
  @ViewChild('barChart') barChart
  @ViewChild('lineCanvas') lineCanvas
  @ViewChild('pieCanvas') pieCanvas
  @ViewChild('doughnutCanvas') doughnutCanvas

  lineChart: any
  pieChart: any
  doughnutChart: any
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

  constructor(private dataExpensesService: DataExpensesService) {}

  curDate = new Date()

  swiper = {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      renderBullet(index, className) {
        return `<span class="${className}">${getTextForPage(index)}</span>`
      },
    },
  } as SwiperOptions

  async ionViewDidEnter() {
    await this.createBarChart()
    await this.createLineChart()
    await this.createPieChart()
    await this.createDoughnutChart()
  }

  getSumAllExpensesAnalysis(expenses: ExpenseItem[]) {
    if (expenses) {
      return expenses
        ?.filter(expense => expense.value)
        ?.reduce((sum, x) => sum + x.value, 0.0)
    }

    return 0.0
  }

  async createBarChart() {
    const date = new Date()
    const month1 = date.getMonth()
    const year1 = date.getFullYear()
    const date2 = new Date(date.setMonth(month1 + 1))
    const date3 = new Date(date.setMonth(date.getMonth() + 1))
    const date4 = new Date(date.setMonth(date.getMonth() + 1))
    const date5 = new Date(date.setMonth(date.getMonth() + 1))
    const date6 = new Date(date.setMonth(date.getMonth() + 1))
    const date7 = new Date(date.setMonth(date.getMonth() + 1))
    const date8 = new Date(date.setMonth(date.getMonth() + 1))
    const date9 = new Date(date.setMonth(date.getMonth() + 1))
    const date10 = new Date(date.setMonth(date.getMonth() + 1))
    const date11 = new Date(date.setMonth(date.getMonth() + 1))
    const date12 = new Date(date.setMonth(date.getMonth() + 1))

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

    const expensesMonthSum4 = this.getSumAllExpensesAnalysis(
      await this.dataExpensesService.getExpensesByMonthAndYear({
        month: date4.getMonth(),
        year: date4.getFullYear(),
      }),
    )

    const expensesMonthSum5 = this.getSumAllExpensesAnalysis(
      await this.dataExpensesService.getExpensesByMonthAndYear({
        month: date5.getMonth(),
        year: date5.getFullYear(),
      }),
    )

    const expensesMonthSum6 = this.getSumAllExpensesAnalysis(
      await this.dataExpensesService.getExpensesByMonthAndYear({
        month: date6.getMonth(),
        year: date6.getFullYear(),
      }),
    )
    const expensesMonthSum7 = this.getSumAllExpensesAnalysis(
      await this.dataExpensesService.getExpensesByMonthAndYear({
        month: date7.getMonth(),
        year: date7.getFullYear(),
      }),
    )

    const expensesMonthSum8 = this.getSumAllExpensesAnalysis(
      await this.dataExpensesService.getExpensesByMonthAndYear({
        month: date8.getMonth(),
        year: date8.getFullYear(),
      }),
    )

    const expensesMonthSum9 = this.getSumAllExpensesAnalysis(
      await this.dataExpensesService.getExpensesByMonthAndYear({
        month: date9.getMonth(),
        year: date9.getFullYear(),
      }),
    )

    const expensesMonthSum10 = this.getSumAllExpensesAnalysis(
      await this.dataExpensesService.getExpensesByMonthAndYear({
        month: date10.getMonth(),
        year: date10.getFullYear(),
      }),
    )

    const expensesMonthSum11 = this.getSumAllExpensesAnalysis(
      await this.dataExpensesService.getExpensesByMonthAndYear({
        month: date11.getMonth(),
        year: date11.getFullYear(),
      }),
    )

    const expensesMonthSum12 = this.getSumAllExpensesAnalysis(
      await this.dataExpensesService.getExpensesByMonthAndYear({
        month: date6.getMonth(),
        year: date6.getFullYear(),
      }),
    )

    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: [
          this.months[month1],
          this.months[date2.getMonth()],
          this.months[date3.getMonth()],
          this.months[date4.getMonth()],
          this.months[date5.getMonth()],
          this.months[date6.getMonth()],
          this.months[date7.getMonth()],
          this.months[date8.getMonth()],
          this.months[date9.getMonth()],
          this.months[date11.getMonth()],
          this.months[date12.getMonth()],
        ],
        datasets: [
          {
            label: `Gastos referente ao ano de ${this.curDate.getFullYear()}`,
            data: [
              expensesMonthSum1,
              expensesMonthSum2,
              expensesMonthSum3,
              expensesMonthSum4,
              expensesMonthSum5,
              expensesMonthSum6,
              expensesMonthSum7,
              expensesMonthSum8,
              expensesMonthSum9,
              expensesMonthSum10,
              expensesMonthSum11,
              expensesMonthSum12,
            ],
            backgroundColor: [
              '#2c2c54',
              '#ff5252',
              '#cd6133',
              '#34ace0',
              '#218c74',
              '#84817a',
              '#ccae62',
              '#227093',
              '#ff793f',
              '#33d9b2',
              '#84817a',
              '#706fd3',
            ],
            // borderColor: 'rgb(38, 194, 129)',
            // borderWidth: 1,
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
              '#2c2c54',
              '#ff5252',
              '#cd6133',
              '#34ace0',
              '#218c74',
            ],
            // borderColor: '#450020',
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

  //Aqui está o grafico de pizza, 3 na tela de exibição
  async createPieChart() {
    const date = new Date()
    const month1 = date.getMonth()
    const year1 = date.getFullYear()
    const date2 = new Date(date.setMonth(month1 + 1))

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
    this.bars = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: [this.months[month1], this.months[date2.getMonth()]],
        datasets: [
          {
            label: `Gastos referente ao Ano de ${this.curDate.getFullYear()}`,
            data: [expensesMonthSum1, expensesMonthSum2],
            backgroundColor: ['#2c2c54', '#ff5252'],
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
  async createDoughnutChart() {
    const date = new Date()
    const month1 = date.getMonth()
    const year1 = date.getFullYear()
    const date2 = new Date(date.setMonth(month1 + 1))
    const date3 = new Date(date.setMonth(date.getMonth() + 1))
    const date4 = new Date(date.setMonth(date.getMonth() + 1))
    const date5 = new Date(date.setMonth(date.getMonth() + 1))
    const date6 = new Date(date.setMonth(date.getMonth() + 1))

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

    const expensesMonthSum4 = this.getSumAllExpensesAnalysis(
      await this.dataExpensesService.getExpensesByMonthAndYear({
        month: date4.getMonth(),
        year: date4.getFullYear(),
      }),
    )

    const expensesMonthSum5 = this.getSumAllExpensesAnalysis(
      await this.dataExpensesService.getExpensesByMonthAndYear({
        month: date5.getMonth(),
        year: date5.getFullYear(),
      }),
    )

    const expensesMonthSum6 = this.getSumAllExpensesAnalysis(
      await this.dataExpensesService.getExpensesByMonthAndYear({
        month: date6.getMonth(),
        year: date6.getFullYear(),
      }),
    )

    this.bars = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: [
          this.months[month1],
          this.months[date2.getMonth()],
          this.months[date3.getMonth()],
          this.months[date4.getMonth()],
          this.months[date5.getMonth()],
          this.months[date6.getMonth()],
        ],
        datasets: [
          {
            label: 'Gastos no próximo semestre',
            data: [
              expensesMonthSum1,
              expensesMonthSum2,
              expensesMonthSum3,
              expensesMonthSum4,
              expensesMonthSum5,
              expensesMonthSum6,
            ],
            backgroundColor: [
              '#2c2c54',
              '#ff5252',
              '#cd6133',
              '#34ace0',
              '#218c74',
              '#84817a',
            ],
            // borderColor: '#2c2c54',
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
function getTextForPage(index) {
  console.log(index)
  switch (index) {
    case 0:
      return '2'
    case 1:
      return '3'
    case 2:
      return '6'
    case 3:
      return '12'
  }
}
