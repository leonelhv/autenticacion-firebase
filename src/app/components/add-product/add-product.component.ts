import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FarmaciaService } from 'src/app/services/farmacia.service';
import { OverlayService } from 'src/app/services/overlay.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
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
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      costo: ['', [Validators.required, Validators.min(0.5)]],
      imagen: ['', [Validators.required, Validators.pattern(this.regexImagen)]],
    });
  }

  guardar() {
    const { nombre, costo, imagen } = this.formProducto.value;
    const newProducto = {
      nombre: String(nombre.trim()),
      costo,
      imagen: String(imagen.trim()),
    };
    this.farmaciaService.addProduct(newProducto);
    Swal.fire({
      icon: 'success',
      title: `El producto: ${nombre} fue agregado correctamente`,
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
