import {Page} from 'ionic-angular';
import {Camera} from 'ionic-native';
import {Http} from 'angular2/http';
import {Dataportal} from '../../providers/dataportal/dataportal';
import {Firebase} from 'firebase/firebase';

@Page({
  templateUrl: 'build/pages/home/home.html',
  providers: [Dataportal]

})
export class HomePage {
  public base64Image: string;
  private datas = [];
  private start: number = 0;
  private page: number = 1;
  private fb;
  //messagesRef: Firebase; // Initialized Firebase object

  constructor(public http: Http, public dataportal: Dataportal) {
    this.http = http;
    this.dataportal = dataportal;
    
  }  

  takePicture() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }


  // cordova plugin add cordova-plugin-inappbrowser@1.1.0
  
  sendFirebase(){
    this.fb = new Firebase('https://yfzbwd3kusm.firebaseio-demo.com/');
  }
  
  
  getList(page) {
    return new Promise(resolve => {
      this.dataportal.getList(page).subscribe((data) => {       
        if (!data.response.body.items.item) resolve(true);
         
        for (let d of data.response.body.items.item) {
          this.datas.push(d);
        }
        resolve(true);
      }, error => console.log("error")
      , () => console.log("complet"));
    });
  }

  doInfinite(infiniteScroll: any) {
    console.log('doInfinite, start is currently ' + this.page);
    this.page += 1;
    
    this.getList(this.page).then(() => {
      infiniteScroll.complete();
    });
  }

}
