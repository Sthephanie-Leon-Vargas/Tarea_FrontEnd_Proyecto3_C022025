import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ICategoria } from "../../../interfaces/categoria";

@Component({
    selector: "app-categoria-form",
    templateUrl: "./categoria-form.component.html",
    styleUrls: ["./categoria-form.component.scss"],
    standalone: true,
    imports: [
      ReactiveFormsModule,
      CommonModule
    ],
  })
  export class CategoriaFormComponent {
    public fb: FormBuilder = inject(FormBuilder);
    @Input() form!: FormGroup;
    @Output() callSaveMethod: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();
    @Output() callUpdateMethod: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();
  
    callSave() {
        let item: ICategoria = {
          nombre: this.form.controls["nombre"].value,
          descripcion: this.form.controls["descripcion"].value
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