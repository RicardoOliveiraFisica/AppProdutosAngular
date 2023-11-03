import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CurrencyMask {
  mask(value: string|number): string {
    let valorFormatado = value + '';
    valorFormatado = valorFormatado
        .replace(/\D/g, '')
        .replace(/^0+/,"");

    if (valorFormatado.length < 3)
      valorFormatado = ('000' + valorFormatado).slice(-3);

    valorFormatado = valorFormatado.replace(/(\d+)(\d{2})$/, 'R$ $1,$2');
    return valorFormatado;
  }
}
