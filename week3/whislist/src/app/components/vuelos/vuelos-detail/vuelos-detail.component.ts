import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vuelos-detail',
  templateUrl: './vuelos-detail.component.html',
  styleUrls: ['./vuelos-detail.component.scss']
})
export class VuelosDetailComponent implements OnInit {

  id: any;

  constructor(private router: ActivatedRoute) { 
    router.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
  }

}
