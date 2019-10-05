import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test title attr';

  ngOnInit() {
    setTimeout(() => { this.title = "It changed!!"; }, 5000);
  }
}
