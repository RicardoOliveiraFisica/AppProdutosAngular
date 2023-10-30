import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

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
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Produto não encontrado!',
        footer: 'Recarregue a página e tente novamente'
      });
      this.router.navigate(['/products']);
    }
  }

  update() {
    const product: IProduct = this.productForm.value as IProduct;
    this.productsService.update(product).subscribe(result => {
      Swal.fire(
        'Atualizado!',
        'Produto atualizado com sucesso!',
        'success'
      );
      this.router.navigate(['/products']);

    }, error => {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Produto não atualizado!',
        footer: (error.error.errors ? error.error.errors[0].defaultMessage : error.error.message)
      })
    });
  }
}
