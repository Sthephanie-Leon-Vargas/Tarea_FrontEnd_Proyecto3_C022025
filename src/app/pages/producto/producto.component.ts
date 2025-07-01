import { ModalService } from './../../services/modal.service';
import { Component, inject, OnInit, ViewChild } from "@angular/core";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { FormBuilder, Validators } from "@angular/forms";
import { ModalComponent } from '../../components/modal/modal.component';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ProductoFormComponent } from '../../components/producto/producto-form/producto-form.component';
import { IProducto } from '../../interfaces/producto';
import { ProductoService } from '../../services/producto.service';
import { ICategoria } from '../../interfaces/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { ProductoListComponent } from '../../components/producto/producto-list/producto-list.component';
import { effect } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: "app-producto",
  templateUrl: "./producto.component.html",
  styleUrls: ["./producto.component.scss"],
  standalone: true,
  imports: [
    ProductoFormComponent,
    ProductoListComponent,
    PaginationComponent,
    ModalComponent
  ]
})
export class ProductoComponent implements OnInit {
  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  public productoList: IProducto[] = []
  public productoService: ProductoService = inject(ProductoService);
  
  areActionsAvailable=false;

  public categoriaService = inject(CategoriaService);//instancia con la categoria

  public fb: FormBuilder = inject(FormBuilder);
  public productoForm = this.fb.group({
    id: [null],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    precio: [null, Validators.required],
    cantidadStock: [null, Validators.required],
    categoria: this.fb.control(null, Validators.required)

  });
  public modalService: ModalService = inject(ModalService);
  @ViewChild('editProductoModal') public editProductoModal: any;

  public authService: AuthService = inject(AuthService);
  
  public route: ActivatedRoute = inject(ActivatedRoute);

  public categorias: ICategoria[] = [];

  ngOnInit(): void {
    
    this.authService.getUserAuthorities();
    this.route.data.subscribe( data => {
      this.areActionsAvailable = this.authService.areActionsAvailable(data['authorities'] ? data['authorities'] : []);
    });
    this.areActionsAvailable=this.authService.isSuperAdmin();
    this.categoriaService.getAll();
    
  }

  constructor() {
    this.productoService.getAll();
    this.categoriaService.getAll(); 
    effect(() => {
      this.categorias = this.categoriaService.categoria$();
    });
  }

  saveProducto(item: IProducto) {
    this.productoService.save(item);
    this.productoForm.reset();
  }

  updateProducto(item: IProducto) {
    this.productoService.update(item);
    this.modalService.closeAll();
    this.productoForm.reset();
    
  }


  deleteProducto(item: IProducto) {
    this.productoService.delete(item);
  }
  openEditProductoModal(producto: IProducto) {
    console.log("openEditProductoModal", producto);
    this.categoriaService.getAll(); 

    const selectedCategoria = this.categorias.find(cat => cat.id === producto.categoria?.id) ?? null;

    this.productoForm.patchValue({
        id: JSON.stringify(producto.id),
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        cantidadStock: producto.cantidadStock,
        categoria:selectedCategoria 
      } as any);

    this.modalService.displayModal('lg', this.editProductoModal);
    }
    
  compareCategorias(c1: ICategoria, c2: ICategoria): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  

}