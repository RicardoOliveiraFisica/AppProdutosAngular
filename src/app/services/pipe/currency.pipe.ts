import { Pipe, PipeTransform } from '@angular/core';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
@Pipe({ name: 'currency' })
export class CurrencyPipe implements PipeTransform {
  transform(value: string|number): string {
    let valorFormatado = value + '';
    let aux = valorFormatado.split('.');
    valorFormatado = aux[0] + ((aux[1] || '') + '00').substring(0, 2);

    valorFormatado = valorFormatado.replace(/(\d+)(\d{2})$/, 'R$ $1,$2');
    return valorFormatado;
  }
}
