import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { ICategoria } from "../../../interfaces/categoria";

@Component({
  selector: "app-categoria-list",
  templateUrl: "./categoria-list.component.html",
  styleUrls: ["./categoria-list.component.scss"],
  standalone: true
})
export class CategoriaListComponent {
  @Input() pCategoriaList: ICategoria[] = [];
  @Output() callUpdateModalMethod: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();
  @Output() callDeleteMethod: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();
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