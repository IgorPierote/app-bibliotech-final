import { Router } from '@angular/router';
import { EmprestimoService } from '../../services/emprestimo.service';
import { NotificationService } from '../../services/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { Emprestimo } from 'src/app/models/emprestimo';
import { LivroService } from 'src/app/services/livro.service';
import { Livro } from 'src/app/models/livro';

@Component({
  selector: 'app-novo-emprestimo',
  templateUrl: './novo-emprestimo.component.html',
  styleUrls: ['./novo-emprestimo.component.css']
})
export class NovoEmprestimoComponent implements OnInit {

  public formEmprestimo: FormGroup;
  public isLoadUpLoad: boolean = false;
  private  fotoUrl:string = "";
  public livros: Livro[] = [];

  constructor(
    fb: FormBuilder,
    private notification: NotificationService,
    private emprestimoService: EmprestimoService,
    private router: Router,
    private upLoadService: UploadService,
    private livroService: LivroService
  ) {    
    this.formEmprestimo = fb.group({
      livro: ["", [Validators.required]],
      leitor: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      telefone: ["", [Validators.required]],
      status: ["", [Validators.required]],
      capa: [""]
      /* dataEmprestimo: ["", [Validators.required]] */
    });
  }

  ngOnInit(): void {
    this.initalizeLivros();
  }

  public createEmprestimo(): void {
    if(this.formEmprestimo.valid) {
      const emprestimo: Emprestimo = this.formEmprestimo.value;
      emprestimo.dataEmprestimo = new Date().toLocaleDateString();
      this.emprestimoService.createEmprestimo(emprestimo).subscribe(response => {
        this.notification.showMessage("Cadastrado com sucesso.");
        this.router.navigate(["/dashboard"]);
      });
    }
    else {
      this.notification.showMessage("Dados inválidos.");
    }
  }

  public uploadFile(event: any): void {
    this.isLoadUpLoad = true;
    const file: File= event.target.files[0];
  }

  public initalizeLivros():void{
    this.livroService.findAll().subscribe(livros => {
      this.livros = livros
    })
  }

  public deleteEmprestimo(id: string): void {
    this.emprestimoService.deleteEmprestimo(id).subscribe(response => {
      console.log(response);
      this.notification.showMessage("Apagado.");
    });
  }
}
