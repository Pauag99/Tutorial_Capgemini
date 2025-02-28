import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Prestamo } from '../prestamo/model/Prestamo';
import { PrestamoPage } from '../prestamo/model/PrestamoPage';
import { HttpClient } from '@angular/common/http';
import { PRESTAMOS_DATA } from '../prestamo/model/mock-prestamos';


@Injectable({
    providedIn: 'root',
})
export class PrestamosService {
    constructor(private http: HttpClient) {}

    private baseUrl = 'http://localhost:8080/prestamo';

    getPrestamos(pageable: Pageable, gamename?:string, clientname?: string, date?: Date): Observable<PrestamoPage> {
      let params = '';
      if (gamename != null) {
        params += 'gameTitle=' + gamename + '&';
      }
      if (clientname != null) {
          params += 'clientName=' + clientname + '&';
      }
      if(date != null){
        params += 'date=' + date.toISOString();
      }
      console.log(date)

      if(params === ''){
        //return of(PRESTAMOS_DATA);
        return this.http.post<PrestamoPage>(this.baseUrl, { pageable: pageable });
      }
      else{
        let url = this.baseUrl + '?' + params;
        return this.http.post<PrestamoPage>(url, { pageable: pageable });
      }
    }

    savePrestamos(prestamo: Prestamo): Observable<Prestamo> {
        const { id } = prestamo;
        let url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
        url = url + '?';
        url = url + 'clientname=' + prestamo.clientname + '&';
        url = url + 'gamename=' + prestamo.gamename + '&';
        return this.http.put<Prestamo>(url, prestamo);
    }

    deletePrestamos(idPrestamo: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${idPrestamo}`);
    }

    getAllPrestamos(): Observable<Prestamo[]> {
        return this.http.get<Prestamo[]>(this.baseUrl);
    }
}

