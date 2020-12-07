import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { MonthYear } from './month-year'

@Component({
  selector: 'app-month-year-select',
  templateUrl: './month-year-select.component.html',
  styleUrls: ['./month-year-select.component.css'],
})
export class MonthYearSelectComponent implements OnInit {
  @Output() eventMonthYear = new EventEmitter<MonthYear>()
  public monthSelect: number = new Date().getMonth()
  public yearSelect: number = new Date().getFullYear()

  public readonly months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ]

  private readonly minMonth = 0
  private readonly maxMonth = 11

  ngOnInit() {
    this.emitEventMonthYear()
  }

  changeMonth(nextMonth: boolean) {
    if (nextMonth) this.monthSelect++
    else this.monthSelect--

    this.checkWhetherToChangeTheYear()

    this.emitEventMonthYear()
  }

  private checkWhetherToChangeTheYear() {
    if (this.monthSelect === this.maxMonth + 1) this.forwardYear()
    else if (this.monthSelect === this.minMonth - 1) this.rewindYear()
  }

  private forwardYear() {
    this.yearSelect++
    this.monthSelect = this.minMonth
  }

  private rewindYear() {
    this.yearSelect--
    this.monthSelect = this.maxMonth
  }

  private emitEventMonthYear = () =>
    this.eventMonthYear.emit({ month: this.monthSelect, year: this.yearSelect })
}
