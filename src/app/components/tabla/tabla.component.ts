import { Component, OnInit } from '@angular/core';
import { Medicamento } from 'src/app/interfaces/interface';
import { FarmaciaService } from 'src/app/services/farmacia.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
})
export class TablaComponent implements OnInit {
  medicamentos!: Medicamento[];

  constructor(private farmaciaService: FarmaciaService) {}

  ngOnInit(): void {
    this.farmaciaService.getProductos().subscribe((res) => {
      this.medicamentos = res;
    });
  }

  onDelete(medicamento: Medicamento) {
    this.farmaciaService.deleteProducto(medicamento);
  }
}
