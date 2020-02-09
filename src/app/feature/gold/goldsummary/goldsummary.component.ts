import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../accore/apiservice/apiservice.service';

@Component({
  selector: 'app-goldsummary',
  templateUrl: './goldsummary.component.html',
  styleUrls: ['./goldsummary.component.scss']
})
export class GoldsummaryComponent implements OnInit {

  israteloading:boolean = true;
  gold_price: any;

  constructor(private api: ApiserviceService) { }

  ngOnInit() {
    this.get_gold_rate();
  }

  get_gold_rate() {
    this.api.apiget("gold_price").subscribe (
      (data) => {
        console.log(data);
        this.gold_price = data[0];
        this.israteloading = false;
      }      
  );
  }


}
