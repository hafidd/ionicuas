import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: any;
  hideMe: boolean;
  public arrow: any;

  public jenis: string;
  public kabupaten: string;

  public item: Array<any> = [];
  public kabupatens: Array<any> = [];
  public jenises: Array<any> = [];
  private url = "http://localhost:8080/";
  //private url = "https://webmobile99.000webhostapp.com/yiiweb/ionicuas/web/";
  //private url = "http://192.168.43.65/ionicuas/web/";

  constructor(
    public navCtrl: NavController,
    public http: HttpClient
  ) {
    this.hideMe = false;
    this.arrow = "ios-arrow-down";
    this.jenis = "Semua Wisata";
    this.kabupaten = "Semua Kabupaten";
  }

  ionViewWillEnter() {
    this.load();
    this.loadSelect();
  }

  // load data
  load(): void {
    this.http
      .get(this.url + 'api/get-wisata?tipe=' + this.jenis + '&kab=' + this.kabupaten)
      .subscribe((data: any) => {
        //console.dir(data);
        this.item = data;
      }, (error: any) => {
        console.dir(error);
      });
  }

  // load data
  loadSelect(): void {
    // kabupaten
    this.http
      .get(this.url + 'api/kabupaten')
      .subscribe((data: any) => {
        //console.dir(data);
        this.kabupatens = data;
      }, (error: any) => {
        console.dir(error);
      });
    // jenis
    this.http
      .get(this.url + 'api/jenis')
      .subscribe((data: any) => {
        //console.dir(data);
        this.jenises = data;
      }, (error: any) => {
        console.dir(error);
      });
  }

  // hide
  hideFilter() {
    this.hideMe = !this.hideMe;
    this.arrow == "ios-arrow-down" ? this.arrow = "ios-arrow-up" : this.arrow = "ios-arrow-down";
  }

  goDetail(param: any) : void{
		this.navCtrl.push('DetailPage', 
			param
			);
	} 

}
