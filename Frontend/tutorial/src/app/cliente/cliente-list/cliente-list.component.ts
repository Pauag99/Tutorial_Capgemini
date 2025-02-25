import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/Cliente';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';
import { ClienteEditComponent } from '../cliente-edit/cliente-edit.component';

@Component({
  selector: 'app-cliente-list',
  imports: [MatButtonModule,
          MatIconModule,
          MatTableModule,
          CommonModule],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.scss'
})
export class ClienteListComponent implements OnInit {

      dataSource = new MatTableDataSource<Cliente>();
      displayedColumns: string[] = ['id', 'name', 'action'];

    constructor(
          private clienteService: ClienteService,
          public dialog: MatDialog,
        ) { }
      
        ngOnInit(): void {
          this.clienteService.getClientes().subscribe(
            clientes => this.dataSource.data = clientes
          );
        }

        createCliente() {    
          const dialogRef = this.dialog.open(ClienteEditComponent, {
            data: {}
          });
      
          dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
          });    
        }

        editCliente(cliente: Cliente) {
          const dialogRef = this.dialog.open(ClienteEditComponent, {
            data: { cliente }
          });
      
          dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
          });
        }

        deleteCliente(cliente: Cliente) {
          const dialogRef = this.dialog.open(DialogConfirmationComponent, {
            data: {
              title: `Desea realmente excluir al cliente ${cliente.name}?`
            }
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.clienteService.deleteCliente(cliente.id).subscribe(() => {
                this.ngOnInit();
              });
            }
          });
        }
  }
