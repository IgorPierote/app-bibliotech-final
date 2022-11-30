import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { Emprestimo } from 'src/app/models/emprestimo';
import { EmprestimoService } from 'src/app/services/emprestimo.service';

@Component({
  selector: 'app-editar-emprestimo',
  templateUrl: './editar-emprestimo.component.html',
  styleUrls: ['./editar-emprestimo.component.css']
})
export class EditarEmprestimoComponent implements OnInit {

  public emprestimo!: Emprestimo;

  
  public isLoadUpLoad: boolean = false;
  constructor(
    private notification: NotificationService,
    private emprestimoService: EmprestimoService,
    private router: Router,
    private route: ActivatedRoute,
    private upLoadService: UploadService
  ) { }

  ngOnInit(): void {
    this.initilizeFields();
  }

  private initilizeFields(): void {
    const id = this.route.snapshot.params["id"];
    this.emprestimoService.findById(id).subscribe(emprestimo => {
      this.emprestimo = emprestimo;
    });
  }

  public updateEmprestimo(form: NgForm): void {
    if(form.valid) {
      this.emprestimoService.updateEmprestimo(this.emprestimo).subscribe(response => {
        this.notification.showMessage("Atualizado com sucesso.");
        this.router.navigate(["/dashboard"]);
      });
    }
    else {
      this.notification.showMessage("Dados inválidos.");
    }
  }


}
