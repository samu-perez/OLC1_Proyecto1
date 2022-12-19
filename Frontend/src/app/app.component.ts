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
  @ViewChild('textSalidaHTML') textSalidaHTML: ElementRef;

  tablaSimbolos = []
  listaErrores = []

  constructor(private traductorService: TraductorService){

  }

  //title = 'Frontend';

  ngOnInit(): void {
    
  }

  traducir(){
    const entrada = this.textEntrada.nativeElement.value
    if(entrada == "") return
    
    this.traductorService.createTraduccion({entrada}).subscribe(
      res => {
        console.log(res)
        this.textSalidaPython.nativeElement.value = res.salidaPython
        this.textSalidaHTML.nativeElement.value = res.salidaHTML
        this.tablaSimbolos = res.tablaSimbolos
        this.listaErrores = res.listaErrores
      },
      error => console.log(error)
    )
  }

  limpiar(){
    this.textEntrada.nativeElement.value = ""
    this.textSalidaPython.nativeElement.value = ""
    this.textSalidaHTML.nativeElement.value = ""
    this.tablaSimbolos = []
    this.listaErrores = []
  }

  handleFileInput(event: any) {
    const file = event.target.files[0]

    if(file){
      const fileReader = new FileReader()
      fileReader.onload = () => { 
        //console.log(fileReader.result);
        this.textEntrada.nativeElement.value = fileReader.result 
      } 
      fileReader.readAsText(file);
    }
  }
}
