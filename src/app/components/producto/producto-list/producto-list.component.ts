import { Component, EventEmitter, inject, Input, OnInit, Output } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { IProducto } from "../../../interfaces/producto";
import { ICategoria } from "../../../interfaces/categoria";

@Component({
  selector: "app-producto-list",
  templateUrl: "./producto-list.component.html",
  styleUrls: ["./producto-list.component.scss"],
  standalone: true
})
export class ProductoListComponent implements OnInit{
  areActionsAvailable= false;
  ngOnInit(): void {
   this.areActionsAvailable=this.authService.isSuperAdmin();
  }
  @Input() pProductoList: IProducto[] = [];
  @Output() callUpdateModalMethod: EventEmitter<IProducto> = new EventEmitter<IProducto>();
  @Output() callDeleteMethod: EventEmitter<IProducto> = new EventEmitter<IProducto>();
  
  @Input() categorias: ICategoria[] = [];

  public authService: AuthService = inject(AuthService);
  public route: ActivatedRoute = inject(ActivatedRoute);



}