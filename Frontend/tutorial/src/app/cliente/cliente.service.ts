import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iif, Observable, of } from 'rxjs';
import { Cliente } from './model/Cliente';
import { CLIENT_DATA } from '../cliente/model/mock-clientes';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  constructor(
    private http: HttpClient
  ) { }

  private baseUrl = 'http://localhost:8080/client';

  getClientes(name?: string, clienteId?: number): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.composeFindUrl(name, clienteId));
  }

  saveCliente(cliente: Cliente): Observable<Cliente> {
    const { id } = cliente;
    const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
    return this.http.put<Cliente>(url, cliente);
  }

  deleteCliente(idCliente: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${idCliente}`);
  }

  private composeFindUrl(name?: string, clienteId?: number): string {
    const params = new URLSearchParams();
    if (name) {
      params.set('name', name);
    }
    if (clienteId) {
      params.set('clienteId', clienteId.toString());
    }
    const queryString = params.toString();
    return queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;
  }

}