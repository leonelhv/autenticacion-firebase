import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Medicamento } from 'src/app/interfaces/interface';
import { FarmaciaService } from 'src/app/services/farmacia.service';
import { OverlayService } from 'src/app/services/overlay.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  @Input() data: Medicamento | null = null;
  formProducto!: FormGroup;

  regexImagen =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*\.(jpg|jpeg|png|svg))/;

  constructor(
    private overlayService: OverlayService,
    private fb: FormBuilder,
    private farmaciaService: FarmaciaService
  ) {}

  ngOnInit(): void {
    this.formProducto = this.fb.group({
      nombre: [
        this.data?.nombre,
        [Validators.required, Validators.minLength(5)],
      ],
      costo: [this.data?.costo, [Validators.required, Validators.min(0.5)]],
      imagen: [
        this.data?.imagen,
        [Validators.required, Validators.pattern(this.regexImagen)],
      ],
    });
  }

  guardar() {
    const { nombre, costo, imagen } = this.formProducto.value;
    const producto = {
      nombre: String(nombre.trim()),
      costo,
      imagen: String(imagen.trim()),
    };

    if (this.data?.id) {
      this.farmaciaService.updateProducto(this.data.id, producto);
    } else {
      this.farmaciaService.addProduct(producto);
    }
    Swal.fire({
      icon: 'success',
      title: `El producto: ${nombre} fue guardado correctamente`,
      imageUrl: `${imagen}`,
      imageHeight: 100,
    }).then(() => {
      this.overlayService.close('addProduct');
    });
  }
  close() {
    this.overlayService.close('addProduct');
  }

  get form(): { [key: string]: AbstractControl } {
    return this.formProducto.controls;
  }

  campoNoValido(campo: string) {
    return (
      this.formProducto.get(campo)?.invalid &&
      this.formProducto.get(campo)?.touched
    );
  }
}
