import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NotificationService } from './notification.service';
import { from, EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private storage: AngularFireStorage,
    private notification: NotificationService
    ) { }

  public uploadCapa(capa: File): Observable<any> {
    const promise = this.storage.upload(`capas/${Date.now()}`,capa);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro no envio do arquivo.");
        console.error(error);
        return EMPTY;
      })
    );
  }
}