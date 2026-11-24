import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Address, ViaCepResponse } from './models';

@Injectable({ providedIn: 'root' })
export class CepService {
  constructor(private http: HttpClient) {}

  buscar(cep: string): Observable<Address | null> {
    const digitos = cep.replace(/\D/g, '');
    return this.http.get<ViaCepResponse>(`https://viacep.com.br/ws/${digitos}/json/`)
      .pipe(map(dto => dto.erro ? null : ({
        rua: dto.logradouro,
        bairro: dto.bairro,
        cidade: dto.localidade,
        uf: dto.uf
      })));
  }
}
