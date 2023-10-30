import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  productForm = new FormGroup({
    id: new FormControl(0, Validators.required),
    nome: new FormControl('', Validators.required),
    codigoBarras: new FormControl('', Validators.required),
    preco: new FormControl(0.00, Validators.required)
  });

  constructor(private productsService: ProductsService,
              private route: ActivatedRoute,
              private router: Router
    ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productsService.getById(id).subscribe((product: IProduct) => {
        this.productForm.setValue({
          id: product.id || 0,
          nome: product.nome || '',
          codigoBarras: product.codigoBarras || '',
          preco: product.preco || 0.00
        })
      })
    }
  }

  update() {
    const product: IProduct = this.productForm.value as IProduct;
    this.productsService.update(product).subscribe(result => {
      console.log('atualizado');
      this.router.navigate(['/products']);
    });
  }
}
