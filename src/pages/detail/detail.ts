import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

declare var google;

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  map: any;
  public id: any;
  public lat: any;
  public long: any;
  public item: any;
  public name: any;
  public ket: any;
  public img: any;
  public kab: any;
  public images: Array<any> = [];

  private url = "http://localhost:8080/";
  //private url = "http://192.168.43.65/ionicuas/web/";

  constructor(
    public navCtrl: NavController,
    private http: HttpClient,
    public navParams: NavParams, ) {
  }

  ionViewDidLoad() {
    //console.log(this.navParams.get("record"));
    if (this.navParams.get("record")) {
      this.item = this.navParams.get("record");
      this.id = this.item.wis_id;
      this.lat = this.item.wis_lat;
      this.long = this.item.wis_long;
      this.name = this.item.wis_nama;
      this.ket = this.item.wis_keterangan;
      this.kab = this.item.kab_nama;
      this.img = this.item.wis_id + '.' + this.item.wis_gambar;
      this.tampilMap(this.lat, this.long, this.name);
      this.loadGallery();
    }
  }

  tampilMap(lat: any, long: any, name: any): void {
    let locationOptions = { timeout: 20000, enableHighAccuracy: true };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        var myLatlng = new google.maps.LatLng(lat, long);
        let options = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(document.getElementById('akupeta'), options);
        this.buatMarker(name);
        //document.getElementById('spin').visibility = 'hidden';
      },
      (error) => {
        console.log(error)
      }, locationOptions
    );
  }

  buatMarker(name: any) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let konten = "<h5 style='color:rgb(0, 128, 248)'>" + name + "</h5>";

    let infoWindow = new google.maps.InfoWindow({
      content: konten,
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  // load data
  loadGallery(): void {    
    this.http
      .get(this.url + 'wisata-api/get-gallery?id=' + this.id)
      .subscribe((data: any) => {
        console.dir(data);
        this.images = data;
      }, (error: any) => {
        console.dir(error);
      });
  }

}
