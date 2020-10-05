import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core'

@Component({
  selector: 'app-month-select',
  templateUrl: './month-select.component.html',
  styleUrls: ['./month-select.component.css'],
})
export class MonthSelectComponent implements OnInit {
  @Output() eventMonth = new EventEmitter<number>()
  public monthSelect: number

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

  ngOnInit() {
    this.monthSelect = new Date().getMonth()
    console.log(this.monthSelect)
  }
  changeMonth(nextMonth: boolean) {
    const tempMonth = nextMonth ? this.monthSelect + 1 : this.monthSelect - 1

    if (this.validMonth(tempMonth)) {
      this.monthSelect = tempMonth

      this.eventMonth.emit(this.monthSelect)
    } else {
      // TODO: Exibir mensagem dizendo que não é possível mais aumentar ou diminuir o mês
      console.log('Limite de data', tempMonth)
    }
  }

  private validMonth(monthNumber) {
    const minMonth = 0
    const maxMonth = 11

    return monthNumber >= minMonth && monthNumber <= maxMonth
  }
}
