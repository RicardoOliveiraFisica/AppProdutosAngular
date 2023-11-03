import { Pipe, PipeTransform } from '@angular/core';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
@Pipe({ name: 'currency' })
export class CurrencyPipe implements PipeTransform {
  transform(value: string|number): string {
    let valorFormatado = value + '';

    valorFormatado = valorFormatado
        .replace(/\D/g, '')
    if (valorFormatado.length < 3)
      valorFormatado = ('00' + valorFormatado).slice(-3);
      valorFormatado = valorFormatado.replace(/(\d)(\d{2})$/, 'R$ $1,$2');
    return valorFormatado;
  }
}
