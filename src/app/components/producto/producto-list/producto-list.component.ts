import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
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
export class ProductoListComponent {
  @Input() pProductoList: IProducto[] = [];
  @Output() callUpdateModalMethod: EventEmitter<IProducto> = new EventEmitter<IProducto>();
  @Output() callDeleteMethod: EventEmitter<IProducto> = new EventEmitter<IProducto>();
  
  @Input() categorias: ICategoria[] = [];

  public authService: AuthService = inject(AuthService);
  public areActionsAvailable: boolean = false;
  public route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.authService.getUserAuthorities();
    this.route.data.subscribe( data => {
      this.areActionsAvailable = this.authService.areActionsAvailable(data['authorities'] ? data['authorities'] : []);
    });
  }

}