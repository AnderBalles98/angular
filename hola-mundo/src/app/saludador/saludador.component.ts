import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saludador',
  templateUrl: './saludador.component.html',
  styleUrls: ['./saludador.component.scss']
})
export class SaludadorComponent implements OnInit {

  constructor() { }

  saludar() {
    alert("HOLAAA MUNDOOOO!!");
  }

  ngOnInit(): void {
  }

}
