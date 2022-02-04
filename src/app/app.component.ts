import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'GoogleMap';
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  apiLoaded: Observable<boolean>;
  zoom = 6;
  center: google.maps.LatLngLiteral = { lat: 39.713948, lng: 752.983264 };
  markerOptions: google.maps.MarkerOptions = { draggable: true };
  markerPositions: google.maps.LatLngLiteral[] = [
    { lat: 41.0477225, lng: 29.0540413 },
    { lat: 36.9893984, lng: 28.0226500 },
    { lat: 40.3554758, lng: 27.9433026 },
  ];

  ngOnInit(): void {}

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE',
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }
  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }
}
