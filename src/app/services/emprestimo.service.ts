import { NotificationService } from './notification.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Emprestimo } from '../models/emprestimo';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {

  constructor(
    private firestore: AngularFirestore,
    private notification: NotificationService
  ) { }

  public createEmprestimo(emprestimo: Emprestimo): Observable<any> {
    const promise = this.firestore.collection("emprestimo").add(emprestimo);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao cadastrar.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public findAll(): Observable<any> {
    const promise = this.firestore.collection("emprestimo").get();
    return from(promise).pipe(
      map((response: any) => {
        return response.docs.map((doc: any) => {
          const emprestimo: Emprestimo = doc.data() as Emprestimo;
          emprestimo.idEmprestimo = doc.id;
          return emprestimo;
        })
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar dados.");
        console.error(error);
        return EMPTY;
      })
    );
  }
  public findById(id: string): Observable<any> {
    const promise = this.firestore.collection("emprestimo").doc(id).get();
    return from(promise).pipe(
      map(doc => {
        const emprestimo: Emprestimo = doc.data() as Emprestimo;
        emprestimo.idEmprestimo = doc.id;
        return emprestimo;
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar pelo id");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public deleteEmprestimo(id: string) {
    const promise = this.firestore.collection("emprestimo").doc(id).delete();
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao excluir.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public updateEmprestimo(emprestimo: Emprestimo) {
    const promise = this.firestore.collection("emprestimo").doc(emprestimo.idEmprestimo).update(emprestimo);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao atualizar.");
        console.error(error);
        return EMPTY;
      })
    );
  }
}
