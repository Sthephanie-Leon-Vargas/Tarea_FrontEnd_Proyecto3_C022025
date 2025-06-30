import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { IProducto } from "../../../interfaces/producto";
import { ICategoria } from "../../../interfaces/categoria";

@Component({
  selector: "app-producto-form",
  templateUrl: "./producto-form.component.html",
  styleUrls: ["./producto-form.component.scss"],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
})
export class ProductoFormComponent {
  public fb: FormBuilder = inject(FormBuilder);
  @Input() form!: FormGroup;
  @Output() callSaveMethod: EventEmitter<IProducto> = new EventEmitter<IProducto>();
  @Output() callUpdateMethod: EventEmitter<IProducto> = new EventEmitter<IProducto>();
  @Input() categorias: ICategoria[] = [];

  get categoriaFormGroup(): FormGroup {
    return this.form.get('categoria') as FormGroup;
  }
  
  callSave() {

    let item: IProducto = {
      nombre: this.form.controls["nombre"].value,
      descripcion: this.form.controls["descripcion"].value,
      precio: this.form.controls["precio"].value,
      cantidadStock: this.form.controls["cantidadStock"].value,
      categoria: this.form.get("categoria")?.value
    
    }
    if(this.form.controls['id'].value) {
      item.id = this.form.controls['id'].value;
    } 
    if(item.id) {
      this.callUpdateMethod.emit(item);
    } else {
      this.callSaveMethod.emit(item);
    }
  }

}