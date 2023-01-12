import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedFile: any = null;
  fileContent: string | undefined;

  loading = false;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;

  }

  setFileContent(texto: string | undefined) {
    this.fileContent = texto;
  }

  load() {
    let fileReader: FileReader = new FileReader();
    this.fileContent = '';
    fileReader.onload = (e) => {
      const text = fileReader.result?.toString().trim();
      this.setFileContent(text);
    }
    fileReader.readAsText(this.selectedFile);
  }
}
