import { Component } from '@angular/core';
import { Product } from '../../services/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../services/user';

@Component({
  selector: 'app-products',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products {

   submitted = false;
  products: any[] = [];
  model: any = { name: '', price: 0, description: '' };
  editingId: string | null = null;
  loading = false;
  error: string | null = null;

  constructor(private productService: Product, private userService: User) {}

  ngOnInit(): void { this.load(); 
    this.getAllUser();
  }

  getAllUser(): void {
    this.userService.getAllUser('/users/getAllUser').subscribe({
      next: (res: any) => {
        this.products = res.data ?? res;
      },
      error: (err: { message: string; }) => { this.error = err.message || 'Failed to load'; }
    });
  }

  load(): void {
    this.loading = true;
    this.productService.list().subscribe({
      next: (res: any) => {
        // backend likely responds { success: true, data: [...] } or raw array
        this.products = res.data ?? res;
        this.loading = false;
      },
      error: (err: { message: string; }) => { this.error = err.message || 'Failed to load'; this.loading = false; }
    });
  }


save(): void {
  this.submitted = true;

  // ❌ If any field empty → Block
  if (!this.model.name || !this.model.price || !this.model.description) {
    return;
  }

  // UPDATE
  if (this.editingId) {
    this.productService.update(this.editingId, this.model).subscribe(() => {
      this.reset();
      this.load();
    });
  } 
  // CREATE
  else {
    this.productService.create(this.model).subscribe(() => {
      this.reset();
      this.load();
    });
  }
}

reset(): void {
  this.submitted = false;
  this.editingId = null;
  this.model = { name: '', price: 0, description: '' };
}

  edit(p: any): void {
    this.editingId = p._id ?? p.id ?? null;
    this.model = { name: p.name, price: p.price, description: p.description };
  }

  remove(idOrObj: any): void {
    const id = typeof idOrObj === 'string' ? idOrObj : idOrObj._id ?? idOrObj.id;
    if (!id) return;
    if (!confirm('Delete this product?')) return;
    this.productService.delete(id).subscribe(() => this.load());
  }

  
}
