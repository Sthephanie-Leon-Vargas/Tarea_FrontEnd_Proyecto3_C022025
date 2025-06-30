import { ModalService } from './../../services/modal.service';
import { Component, inject, ViewChild } from "@angular/core";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { FormBuilder, Validators } from "@angular/forms";
import { ModalComponent } from '../../components/modal/modal.component';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriaFormComponent } from '../../components/categoria/categoria-form/categoria-form.component';
import { ICategoria } from '../../interfaces/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriaListComponent } from '../../components/categoria/categoria-list/categoria-list.component';

@Component({
  selector: "app-categoria",
  templateUrl: "./categoria.component.html",
  styleUrls: ["./categoria.component.scss"],
  standalone: true,
  imports: [
    CategoriaFormComponent,
    CategoriaListComponent,
    PaginationComponent,
    ModalComponent
  ]
})
export class CategoriaComponent {
  public categoriaList: ICategoria[] = []
  public categoriaService: CategoriaService = inject(CategoriaService);
  public fb: FormBuilder = inject(FormBuilder);
  public categoriaForm = this.fb.group({
    id: [''],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
  });
  public modalService: ModalService = inject(ModalService);
  @ViewChild('editCategoriaModal') public editCategoriaModal: any;

  public authService: AuthService = inject(AuthService);
  public areActionsAvailable: boolean = false;
  public route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.authService.getUserAuthorities();
    this.route.data.subscribe( data => {
      this.areActionsAvailable = this.authService.isSuperAdmin();
    });
  }

  constructor() {
    this.categoriaService.getAll();
  }

  saveCategoria(item: ICategoria) {
    this.categoriaService.save(item);
  }

  updateCategoria(item: ICategoria) {
    this.categoriaService.update(item);
    this.modalService.closeAll();
    this.categoriaForm.reset();
  }


  deleteCategoria(item: ICategoria) {
    this.categoriaService.delete(item);
  }

  openEditCategoriaModal(categoria: ICategoria) {
    console.log("openEditCategoriaModal", categoria);
    this.categoriaForm.patchValue({
      id: JSON.stringify(categoria.id),
      nombre: categoria.nombre,
      descripcion: categoria.descripcion
    });
    this.modalService.displayModal('lg', this.editCategoriaModal);
  }

}