import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  productForm = new FormGroup({
    id: new FormControl(0, Validators.required),
    nome: new FormControl('', [Validators.maxLength(100) ,Validators.required]),
    codigoBarras: new FormControl('', Validators.required),
    preco: new FormControl(0.00, Validators.required)
  });

  constructor(private productsService: ProductsService,
              private router: Router
  ) {}

  register() {
    const product: IProduct = this.productForm.value as IProduct;
    this.productsService.register(product).subscribe(result => {
      Swal.fire(
        'Cadastrado!',
        'Produto cadastrado com sucesso!',
        'success'
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
        footer: (error.error.errors ? error.error.errors[0].defaultMessage : error.error.message)
      })
    });
  }

  newRegister() {
    Swal.fire({
      title: 'Continuar cadastrando?',
      text: "Se desejar realizar um novo cadastro clique em SIM!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productForm.reset();

      } else {
        this.router.navigate(['/products']);
      }
    })
  }

}
