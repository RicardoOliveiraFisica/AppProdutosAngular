import { Component } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: IProduct[] = [];
  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getAllProducts().subscribe( (result: IProduct[]) => {
      this.products = result;
    });
  }

  delete(id: number) {
    this.productsService.deleteById(id + '').subscribe( result => {
      this.products = this.products.filter(produto => (produto.id != id))
    });
  }
}
