import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { TutorialComponent } from './tutorial.component'

describe('TutorialComponent', () => {
  let component: TutorialComponent
  let fixture: ComponentFixture<TutorialComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TutorialComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(TutorialComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
