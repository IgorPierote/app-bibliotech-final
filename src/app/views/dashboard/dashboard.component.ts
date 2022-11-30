import { NotificationService } from './../../services/notification.service';
import { EmprestimoService } from '../../services/emprestimo.service';
import { Emprestimo } from '../../models/emprestimo';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from 'src/app/components/details/details.component';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns = ['Leitor', 'Livro', 'Data de Emprestimo', 'Status', 'excluir', 'editar', 'Capa'];
  dataSource: Emprestimo[] = [];

  constructor(
    private emprestimoService: EmprestimoService,
    private notification: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initializeTable();
  }

  private initializeTable(): void {
    this.emprestimoService.findAll().subscribe(emprestimo => {
      this.dataSource = emprestimo;
      console.log(emprestimo)
    });
  }

  public deleteEmprestimo(id: string): void {
    this.emprestimoService.deleteEmprestimo(id).subscribe(response => {
      this.notification.showMessage("Apagado.");
      this.initializeTable();
    });
  }
  
  public openDetails(emprestimo: Emprestimo): void {
    this.dialog.open(DetailsComponent, {
      width: "400px",
      data: emprestimo
    });
  }
}
