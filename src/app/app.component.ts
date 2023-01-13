import { Component, OnInit } from '@angular/core';
import { xml2js } from 'xml-js';
import { dataToDTO } from './model/data-dto.model';
import { DataModel } from './model/data.model';
import { Regiao } from './model/regiao.model';
import { ApiService } from './service/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  selectedFile: any = null;
  listRegion: Regiao[] = [];
  filteredList: Regiao[] = [];

  loading = false;
  
  filterList = ['SE', 'S', 'N', 'NE'];
  selectedFilter: string | null = null;

  constructor(private apiService: ApiService){}
  
  ngOnInit(): void {
    this.getRegiao();
  }
  
  changeSelect(event: any){
    this.filteredList = this.listRegion.filter(item => item.regionCode === event.value);
  }
  
  getRegiao(){
    this.loading = true;
    this.apiService.getAllRegiao().subscribe({
      next: (res) => {
        this.loading = false;
        this.listRegion = res as Regiao[];
        this.filteredList = res as Regiao[];
        this.selectedFilter = null;
      },
      error:  (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  setFileContentAndSend(texto: string | undefined) {
    const json: any = xml2js(texto!, {compact: true});
    if (!json.agentes.agente.length){
      json.agentes.agente = [json.agentes.agente];
    }
    const fileContent = json as DataModel;    
    const payload = dataToDTO(fileContent);
    
    this.loading = true;
    this.apiService.sendDataDTOToApi(payload).subscribe({
      next: (res) => {
        this.loading = false;
        this.getRegiao();
      },
      error:  (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  load() {
    let fileReader: FileReader = new FileReader();
    fileReader.onload = (e) => {
      const text = fileReader.result?.toString().trim();
      this.setFileContentAndSend(text);
    }
    fileReader.readAsText(this.selectedFile);
  }
}
