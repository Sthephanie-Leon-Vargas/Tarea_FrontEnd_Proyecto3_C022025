import { inject, Injectable, signal } from '@angular/core';
import { IResponse, ISearch } from '../interfaces';
import { AlertService } from './alert.service';
import { BaseService } from './base-service';
import { IProducto } from '../interfaces/producto';

@Injectable({
    providedIn: 'root'
  })

  export class ProductoService extends BaseService<IProducto> {
    protected override source: string = 'producto';
    private productoListSignal = signal<IProducto[]>([]);
    get producto$() {
      return this.productoListSignal;
    }
    public search: ISearch = { 
      page: 1,
      size: 5
    }
  
    public totalItems: any = [];
    private alertService: AlertService = inject(AlertService);
  
    getAll () {
      this.findAllWithParams({ page: this.search.page, size: this.search.size }).subscribe({
        next: (response: IResponse<IProducto[]>) => {
          this.search = { ...this.search, ...response.meta };
          this.totalItems = Array.from({ length: this.search.totalPages ? this.search.totalPages : 0 }, (_, i) => i + 1);
          this.productoListSignal.set(response.data);
        },
        error: (err: any) => {
          console.error('error', err);
        }
      });
    }
  
    save(item: IProducto) {
      this.add(item).subscribe({
        next: (response: IResponse<IProducto>) => {
          this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
          this.getAll();
        },
        error: (err: any) => {
          this.alertService.displayAlert('error', 'Ocurrió un error al añadir un producto', 'center', 'top', ['error-snackbar']);
          console.error('error', err);
        }
      });
    }
  
    update(item: IProducto) {
      this.edit(item.id, item).subscribe({
        next: (response: IResponse<IProducto>) => {
          this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
          this.getAll();
        },
        error: (err: any) => {
          this.alertService.displayAlert('error', 'Ocurrió un error al actualizar un producto', 'center', 'top', ['error-snackbar']);
          console.error('error', err);
        }
      });
    }
  
    delete(item: IProducto) {
      this.del(item.id).subscribe({
        next: (response: IResponse<IProducto>) => {
          this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
          this.getAll();
        },
        error: (err: any) => {
          this.alertService.displayAlert('error', 'Ocurrió un error al eliminar un producto', 'center', 'top', ['error-snackbar']);
          console.error('error', err);
        }
      });
    }
    
  
  }