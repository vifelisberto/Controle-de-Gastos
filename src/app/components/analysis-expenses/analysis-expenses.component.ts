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

  bars: any
  colorArray: any

  constructor() {}

  ngOnInit(): void {}

  ionViewDidEnter() {
    this.createBarChart()
    this.createLineChart()
    this.createPieChart()
    this.createDoughnutChart()
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
  }

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
