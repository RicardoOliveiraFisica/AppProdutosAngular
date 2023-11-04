import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/product';
import { CurrencyMask } from 'src/app/services/mask/currency.mask';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  submitted = false;

  productForm = new FormGroup({
    id: new FormControl(0, Validators.required),
    nome: new FormControl('', [Validators.maxLength(100) ,Validators.required]),
    codigoBarras: new FormControl('', [Validators.maxLength(14), Validators.required]),
    preco: new FormControl('', Validators.required)
  });

  constructor(private productsService: ProductsService,
              private router: Router,
              private currencyMask: CurrencyMask
  ) {}

  register() {
    this.submitted = true;
    if (this.productForm.valid) {
      const preco = this.productForm.get('preco')?.value + '';
      this.productForm.get('preco')?.setValue(preco.replace('R$ ', '').replace(',', '.'));
      const product: IProduct = this.productForm.value as Partial<IProduct> as IProduct;
      this.productsService.register(product).subscribe(result => {
        Swal.fire({
            title: 'Cadastrado',
            text: "Produto cadastrado com sucesso!",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#212529',
            confirmButtonText: 'Ok'
          }

        ).then((result) => {
          if (result.isConfirmed)
            this.newRegister();
        });
      }, error => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Produto não cadastrado!',
          confirmButtonColor: '#212529',
          footer: (error.error.errors ? error.error.errors[0].defaultMessage : error.error.message)
        })
      });
    }
  }

  newRegister() {
    this.router.navigate(['/products']);
    Swal.fire({
      title: 'Continuar cadastrando?',
      text: "Se desejar realizar um novo cadastro clique em SIM!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#212529',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productForm.reset();
        this.router.navigate(['/products/create']);

      } else {
        /* this.router.navigate(['/products']); */
      }
    })

  }

  getCurrencyMask() {
    const value = this.productForm.get('preco')?.value;
    let precoFormatado = this.currencyMask.mask(value + '');
    this.productForm.get('preco')?.setValue(precoFormatado);
  }
}
