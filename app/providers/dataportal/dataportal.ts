import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Dataportal provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Dataportal {
  data: any = null;
  public serviceKey = "P3XbH7ME1nUA9nssOTGn4CAbHeCfP9SIKnaB51z5Lyb1xLtrThoA08Lo8LLk2EICBN%2FKaB0hVpKwRHpt9DAvxQ%3D%3D";
  
  constructor(public http: Http) {
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('path/to/data.json')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }
    
  getList(page){
    let url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchFestival?ServiceKey=" + this.serviceKey + "&numOfRows=1000&pageNo=" + page +  "&MobileOS=ETC&MobileApp=TestApp&_type=json";
    return this.http.get(url).map(res=>res.json());
  }
}

