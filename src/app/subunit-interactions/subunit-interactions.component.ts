import { Component } from '@angular/core';

@Component({
  selector: 'app-subunit-interactions',
  templateUrl: './subunit-interactions.component.html',
  styleUrls: ['./subunit-interactions.component.css']
})
export class SubunitInteractionsComponent {
  interactions: any[] = [
    "interaction1",
    "interaction2",
    "interaction3"
  ];

  ptms: any[] = [
    "ptm1",
    "ptm2"
  ]

  addNewInteraction () {
    this.interactions.push(`interaction${this.interactions.length + 1}`)
  }

  deleteInteraction (target) {
    this.interactions = this.interactions.filter(interaction => interaction !== target);
  }

}
