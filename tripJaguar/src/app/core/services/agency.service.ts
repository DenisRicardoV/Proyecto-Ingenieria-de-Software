import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandlerService, HandleError } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  API:string = environment.API_ENDPOINT;
  private handleError: HandleError;

  constructor(private db:AngularFirestore,
    private http:HttpClient,
    httpErrorHandler: HttpErrorHandlerService) { }

  public findIdTransactionById(id){

    return new Promise<any>((resolve, reject) => {

      this.http.post<any>(this.API+'agencia/transaction',{id}).subscribe(res=>{
        resolve(res);
      },error=>{
        reject(error.error);
      })
    });
  }

  public findReservasForTurista(idTurist){

    return new Promise<any>((resolve, reject) => {

      this.http.get<any>(this.API+'turista/reserva/list/'+idTurist).subscribe(res=>{
          resolve(res);
        },error=>{
          reject(error.error);
        })
      });
  }


}
