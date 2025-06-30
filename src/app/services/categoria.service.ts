import { inject, Injectable, signal } from '@angular/core';
import { IResponse, ISearch} from '../interfaces';
import { AlertService } from './alert.service';
import { BaseService } from './base-service';
import { ICategoria } from '../interfaces/categoria';

@Injectable({
    providedIn: 'root'
  })

  export class CategoriaService  extends BaseService<ICategoria>{
    protected override source: string = 'categoria';
    private categoriaListSignal = signal<ICategoria[]>([]);
    get categoria$() {
      return this.categoriaListSignal;
    }
    public search: ISearch = { 
      page: 1,
      size: 5
    }
  
    public totalItems: any = [];
    private alertService: AlertService = inject(AlertService);
  
    getAll () {
      this.findAllWithParams({ page: this.search.page, size: this.search.size }).subscribe({
        next: (response: IResponse<ICategoria[]>) => {
          this.search = { ...this.search, ...response.meta };
          this.totalItems = Array.from({ length: this.search.totalPages ? this.search.totalPages : 0 }, (_, i) => i + 1);
          this.categoriaListSignal.set(response.data);
        },
        error: (err: any) => {
          console.error('error', err);
        }
      });
    }
  
    save(item: ICategoria) {
      this.add(item).subscribe({
        next: (response: IResponse<ICategoria>) => {
          this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
          this.getAll();
        },
        error: (err: any) => {
          this.alertService.displayAlert('error', 'Ocurrió un error al añadir una categoria', 'center', 'top', ['error-snackbar']);
          console.error('error', err);
        }
      });
    }
  
    update(item: ICategoria) {
      this.edit(item.id, item).subscribe({
        next: (response: IResponse<ICategoria>) => {
          this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
          this.getAll();
        },
        error: (err: any) => {
          this.alertService.displayAlert('error', 'Ocurrió un error al actualizar una categoria', 'center', 'top', ['error-snackbar']);
          console.error('error', err);
        }
      });
    }
  
    delete(item: ICategoria) {
      this.del(item.id).subscribe({
        next: (response: IResponse<ICategoria>) => {
          this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
          this.getAll();
        },
        error: (err: any) => {
          this.alertService.displayAlert('error', 'Ocurrió un error al eliminar una categoria, revisé que esta categoria no tenga productos asociados', 'center', 'top', ['error-snackbar']);
          console.error('error', err);
        }
      });
    }
    
  
  }