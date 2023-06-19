import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="getData()">Get Data</button>
    <div *ngIf="data">
      <ul>
        <li *ngFor="let item of data.data">
          ID: {{ item.id }}, Name: {{ item.name }}, Email: {{ item.email }}
        </li>
      </ul>
    </div>
    
    <input type="text" [(ngModel)]="name" name="name" placeholder="Enter Name">
    <input type="text" [(ngModel)]="email" name="email" placeholder="Enter Email">
    <button (click)="postData()">Envoyer</button>
  `
})
export class AppComponent {
  serverUrl: string = 'http://localhost:3000';
  data: any;
  name: string = '';
  email: string = '';

  constructor(private http: HttpClient) {}

  getData() {
    console.log('Data to retrieve:');
    this.http.get<any[]>(`${this.serverUrl}/api/customers`).subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  postData() {
    const url = `${this.serverUrl}/api/data`;

    const data = {
      name: this.name,
      email: this.email
    };

    console.log('Data to send:', data);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post(url, data, httpOptions).subscribe(
      (response) => {
        console.log('Data inserted successfully', response);
      },
      (error) => {
        console.error('Error inserting data', error);
      }
    );
  }
}
