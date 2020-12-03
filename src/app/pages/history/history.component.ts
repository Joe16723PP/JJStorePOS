import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  option = 'sell';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // const option = encodeURIComponent(this.route.snapshot.queryParamMap.get('options'));
    // console.log(option);
  }

}
