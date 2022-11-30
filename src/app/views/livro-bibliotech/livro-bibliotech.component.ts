import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/livro';
import { NotificationService } from '../../services/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from 'src/app/components/details/details.component';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-livro-bibliotech',
  templateUrl: './livro-bibliotech.component.html',
  styleUrls: ['./livro-bibliotech.component.css']
})
export class LivroBibliotechComponent implements OnInit {

  public formLivro: FormGroup;
  public isLoadUpLoad: boolean = false;  
  public dataSource: Livro[] = [];
  private capa: string = ""

  displayedColumns = ['Titulo', 'Categoria', 'Autor', 'ISBN', 'excluir'];
 

  constructor(
    fb: FormBuilder,
    private livroService: LivroService,
    private notification: NotificationService,
    private dialog: MatDialog,    
    private router: Router,
    private upLoadService: UploadService,
    
  ) {
    this.formLivro = fb.group({
      titulo: ["", [Validators.required]],
      categoria: ["", [Validators.required]],
      autor: ["", [Validators.required]],
      isbn: ["", [Validators.required]],
      capa: [""]
    });
   }

  ngOnInit(): void {
    this.initializeTable();
  }

  private initializeTable(): void {
    this.livroService.findAll().subscribe(livro => {
      console.log(livro)
      this.dataSource = livro;
    });
  }

  public deleteLivro(id: string): void {
    this.livroService.deleteLivro(id).subscribe(response => {
      console.log(response);
      this.notification.showMessage("Apagado.");
      this.initializeTable();
    });
  }
  
  public openDetails(livro: Livro): void {
    this.dialog.open(DetailsComponent, {
      width: "400px",
      data: livro
    });
  }

  public createLivro(): void {
    if(this.formLivro.valid) {
      const livro: Livro = this.formLivro.value;
        livro.capa = this.capa;
        this.livroService.createLivro(livro).subscribe(response => {
        this.notification.showMessage("Cadastrado com sucesso.");
        this.initializeTable();
        
      });
    }
    else {
      this.notification.showMessage("Dados inválidos.");
    }
  }

  public uploadFile(event: any): void {
    this.isLoadUpLoad = true;
    const file: File= event.target.files[0];
    this.upLoadService.uploadCapa(file).subscribe(response => {
      response.ref.getDownloadURL().then((capa: string) => {
        this.isLoadUpLoad = false;
        this.capa = capa;
      })
    });
  }
}
