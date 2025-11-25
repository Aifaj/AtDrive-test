import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Products } from '../products/products';
import { Product } from '../../services/product';
import { Order } from '../../services/order';

declare var bootstrap: any;

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.html',
  styleUrl:'./orders.scss'
})
export class Orders {
   orders: any[] = [];
  products: any[] = [];
  loading = false;
  error: string | null = null;
cart: any[] = [];
  model: any = {
    userId: sessionStorage.getItem('userId'),
    productIds: '',
    totalAmount: 0
  };

  isUpdateMode = false;
updateModel: any = {};


  constructor(
    private productService: Product,
    private orderService: Order
  ) {
    this.loadProducts();
    this.loadOrders();
  }

  // Load cart from localStorage
ngOnInit() {
  const saved = localStorage.getItem('cart');
  if (saved) {
    this.cart = JSON.parse(saved);
  }
}

// Save to localStorage
saveCart() {
  localStorage.setItem('cart', JSON.stringify(this.cart));
}

// Check if product is in cart
isInCart(id: string) {
  return this.cart.some(x => x._id === id);
}

// Add product to cart
addToCart(product: any) {
  this.cart.push(product);
  this.saveCart();
}

// Remove from cart
removeFromCart(id: string) {
  this.cart = this.cart.filter(x => x._id !== id);
  this.saveCart();
}

// Calculate total
totalAmount() {
  return this.cart.reduce((sum, p) => sum + p.price, 0);
}

// Place order
placeOrder() {
  const payload = {
    userId: this.model.userId,
    productIds: this.cart.map((x: any) => x._id),
    totalAmount: this.totalAmount()
  };

  if (this.isUpdateMode) {
    // UPDATE ORDER
    this.orderService.update(this.updateModel._id, payload).subscribe(() => {
      alert("Order Updated Successfully!");

      this.isUpdateMode = false;
      this.cart = [];
      localStorage.removeItem("cart");

      this.loadOrders();
    });

  } else {
    // CREATE ORDER
    this.orderService.create(payload).subscribe(() => {
      alert("Order Created Successfully!");

      this.cart = [];
      localStorage.removeItem("cart");

      this.loadOrders();
    });
  }
}

  // ---------------------------
  // LOAD PRODUCTS
  // ---------------------------
  loadProducts(): void {
    this.loading = true;
    this.productService.list().subscribe({
      next: (res: any) => {
        this.products = res.data ?? res;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err.message || 'Failed to load products';
        this.loading = false;
      }
    });
  }

  // ---------------------------
  // LOAD ORDERS
  // ---------------------------
 loadOrders(): void {
  this.orderService.listByUser().subscribe((res: any) => {
    this.orders = res;
  });
}


  // ---------------------------
  // CREATE ORDER
  // ---------------------------
  createOrder(): void {
    const payload = {
      userId: this.model.userId,
      productIds: this.model.productIds.split(',').map((x: any) => x.trim()),
      totalAmount: this.model.totalAmount
    };

    this.orderService.create(payload).subscribe({
      next: () => {
        alert('Order Placed successfully');
        this.loadOrders();
      }
    });
  }

  // ---------------------------
  // DELETE ORDER
  // ---------------------------
  deleteOrder(id: string): void {
    this.orderService.delete(id).subscribe(() => {
      alert('Order deleted');
      this.loadOrders();
    });
  }


// Open modal with selected order data
openUpdate(o: any) {
  this.updateModel = o; // store current order

  // 1. clear cart
  this.cart = [];
  localStorage.removeItem("cart");

  // 2. load products by IDs into cart
  o.productIds.forEach((id: any) => {
    const prod = this.products.find((x: any) => x._id === id);
    if (prod) this.cart.push(prod);
  });

  // 3. store updated cart in localStorage
  localStorage.setItem("cart", JSON.stringify(this.cart));

  // 4. open cart modal automatically
  const modal = new (window as any).bootstrap.Modal(
    document.getElementById("cartModal")
  );
  modal.show();

  this.isUpdateMode = true; // enable update button
}


// Save updated order
updateOrder() {
  const payload = {
    productIds: this.updateModel.productIds.split(',').map((x: any) => x.trim()),
    totalAmount: this.updateModel.totalAmount
  };

  this.orderService.update(this.updateModel._id, payload).subscribe(() => {
    alert("Order updated!");

    // Refresh list
    this.loadOrders();

    // Close modal
    const modal: any = document.getElementById('updateModal');
    const bs = bootstrap.Modal.getInstance(modal);
    bs.hide();
  });
}

}

