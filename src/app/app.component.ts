import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public ardshinUsd: Observable<string>;
  public evocaUsd: Observable<string>;
  constructor(private http: HttpClient) {
    this.ardshinUsd = this.http.get(`https://rate.am/calculator/rates.ashx?cr1=USD&hcr=AMD&cr2=RUR&orgId=466fe84c-197f-4174-bc97-e1dc7960edc7&rtype=1&tp=0&l=lang3&r=${(new Date()).getTime()}`).pipe(
      map((rate: any) => (+rate.data.rates[0].buy/+rate.data.rates[1].sell).toFixed(2))
    );
    this.evocaUsd = this.http.get(`https://rate.am/calculator/rates.ashx?cr1=USD&hcr=AMD&cr2=RUR&orgId=0fffdcc4-8e36-49f3-9863-93ad02ce6541&rtype=1&tp=0&l=lang3&r=${(new Date()).getTime()}`).pipe(
      map((rate: any) => (+rate.data.rates[0].buy/+rate.data.rates[1].sell).toFixed(2))
    );
  }

  public ngOnInit() {

  }

}
