import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/product';
import { CurrencyMask } from 'src/app/services/mask/currency.mask';
import { CurrencyPipe } from 'src/app/services/pipe/currency.pipe';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  submitted = false;

  productForm = new FormGroup({
    id: new FormControl(0, Validators.required),
    nome: new FormControl('', [Validators.maxLength(100) ,Validators.required]),
    codigoBarras: new FormControl('', [Validators.maxLength(14), Validators.required]),
    preco: new FormControl('', Validators.required)
  });

  constructor(private productsService: ProductsService,
              private route: ActivatedRoute,
              private router: Router,
              private currencyMask: CurrencyMask,
              private currencyPipe: CurrencyPipe
    ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productsService.getById(id).subscribe((product: IProduct) => {
        this.productForm.setValue({
          id: product.id || 0,
          nome: product.nome || '',
          codigoBarras: product.codigoBarras || '',
          preco: this.currencyPipe.transform(product.preco + '')
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
    this.submitted = true;
    if (this.productForm.valid) {
      const preco = this.productForm.get('preco')?.value + '';
      this.productForm.get('preco')?.setValue(preco.replace('R$ ', '').replace(',', '.'));
      const product: IProduct = this.productForm.value as Partial<IProduct> as IProduct;
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

  getCurrencyMask() {
    const value = this.productForm.get('preco')?.value;
    let precoFormatado = this.currencyMask.mask(value + '');
    this.productForm.get('preco')?.setValue(precoFormatado);
  }


}
