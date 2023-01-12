import { Component } from '@angular/core';
import { xml2js } from 'xml-js';
import { dataToDTO } from './model/data-dto.model';
import { DataModel } from './model/data.model';
import { ApiService } from './service/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedFile: any = null;
  fileContent: DataModel | undefined;

  loading = false;

  constructor(private apiService: ApiService){}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  setFileContentAndSend(texto: string | undefined) {
    const json: any = xml2js(texto!, {compact: true});
    if (!json.agentes.agente.length){
      json.agentes.agente = [json.agentes.agente];
    }
    this.fileContent = json as DataModel;    
    const payload = dataToDTO(this.fileContent);
    
    this.loading = true;
    this.apiService.sendDataDTOToApi(payload).subscribe({
      next: (res) => this.loading = false,
      error:  (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  load() {
    let fileReader: FileReader = new FileReader();
    this.fileContent = undefined;
    fileReader.onload = (e) => {
      const text = fileReader.result?.toString().trim();
      this.setFileContentAndSend(text);
    }
    fileReader.readAsText(this.selectedFile);
  }
}
