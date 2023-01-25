import { Component, OnInit } from '@angular/core';
import { Medicamento } from 'src/app/interfaces/interface';
import { FarmaciaService } from 'src/app/services/farmacia.service';
import Swal from 'sweetalert2';
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
    Swal.fire({
      title: `Estas Seguro de eliminar ${medicamento.nombre}?`,
      text: 'No podrá recuperar esta información!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar',
      imageUrl: `${medicamento.imagen}`,
      imageHeight: 100,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          `El producto ${medicamento.nombre} fue eliminado exitosamente`
        );
        this.farmaciaService.deleteProducto(medicamento);
      }
    });
  }
}
