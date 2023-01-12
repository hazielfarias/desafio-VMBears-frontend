import { Component } from '@angular/core';
import { xml2js } from 'xml-js';
import { DataModel } from './model/data.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedFile: any = null;
  fileContent: DataModel | undefined;

  loading = false;

  onFileSelected(event: any): void {
    
    this.selectedFile = event.target.files[0] ?? null;

  }

  setFileContent(texto: string | undefined) {
    const json: any = xml2js(texto!, {compact: true});
    if (!json.agentes.agente.length){
      json.agentes.agente = [json.agentes.agente];
    }
    this.fileContent = json as DataModel;    
    console.log(this.fileContent.agentes.agente[0].regiao[0]);
    
  }

  load() {
    let fileReader: FileReader = new FileReader();
    this.fileContent = undefined;
    fileReader.onload = (e) => {
      const text = fileReader.result?.toString().trim();
      this.setFileContent(text);
    }
    fileReader.readAsText(this.selectedFile);
  }
}
