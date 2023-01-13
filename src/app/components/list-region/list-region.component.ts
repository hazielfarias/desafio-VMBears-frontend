import { Component, Input } from '@angular/core';
import { Regiao } from 'src/app/model/regiao.model';

@Component({
  selector: 'app-list-region',
  templateUrl: './list-region.component.html',
  styleUrls: ['./list-region.component.css']
})
export class ListRegionComponent {

  @Input() list: Regiao[] = [];

  displayedColumns: string[] = ['sigla', 'codigo', 'compra', 'geracao'];

}
