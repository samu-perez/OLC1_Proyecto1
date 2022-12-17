import { Component, ViewChild, ElementRef } from '@angular/core';
import { TraductorService } from "./services/traductor.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @ViewChild('textEntrada') textEntrada: ElementRef;
  @ViewChild('textSalidaPython') textSalidaPython: ElementRef;

  constructor(private traductorService: TraductorService){

  }

  //title = 'Frontend';

  ngOnInit(): void {
    console.log('textEntrada', this.textEntrada)
  }

  traducir(){
    const entrada = this.textEntrada.nativeElement.value
    if(entrada == "") return
    
    this.traductorService.createTraduccion({entrada}).subscribe(
      res => {
        console.log(res)
        this.textSalidaPython.nativeElement.value = res.salidaPython
      },
      error => console.log(error)
    )
  }
}
