import { Component } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

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
    if (id) {
      Swal.fire({
        title: 'Você deseja excluir esse produto?',
        text: "Esse processo é irreversível!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#212529',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, exclua-o!',
        cancelButtonText: 'Não'
      }).then((result) => {
        if (result.isConfirmed) {
          this.productsService.deleteById(id + '').subscribe( result => {
            Swal.fire({
                title: 'Deletado!',
                text: "Produto deletado com sucesso!",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#212529',
                confirmButtonText: 'Ok'
              }
            );
            this.products = this.products.filter(produto => (produto.id != id));
          }, error => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Produto não deletado!',
              footer: (error.error.errors ? error.error.errors[0].defaultMessage : error.error.message)
            })
          });
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Produto não encontrado!',
        footer: 'Recarregue a página e tente novamente',
        confirmButtonColor: '#212529',
      });
    }
  }
}
