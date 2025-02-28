import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PrestamoEditComponent } from '../prestamo-edit/prestamo-edit.component';
import { PrestamosService } from '../prestamo.service';
import { Prestamo } from '../model/Prestamo';
import { Pageable } from '../../core/model/page/Pageable';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Cliente } from '../../cliente/model/Cliente';
import { ClienteService } from '../../cliente/cliente.service';
import { GameService } from '../../game/game.service';
import { Game } from '../../game/model/Game';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';


@Component({
    selector: 'app-prestamos-list',
    standalone: true,
    imports: [MatButtonModule,
            MatIconModule,
            MatTableModule,
            CommonModule,
            FormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatSelectModule,
            MatPaginator,
            MatDatepickerModule,
            MatNativeDateModule],
    templateUrl: './prestamo-list.component.html',
    styleUrl: './prestamo-list.component.scss',
})
export class PrestamosListComponent implements OnInit {
    pageNumber: number = 0;
    pageSize: number = 5;
    totalElements: number = 0;
    clientes: Cliente[];
    games: Game[];
    prestamos: Prestamo[];
    filterClientes: Cliente;
    filterGames: Game;
    filterDate: Date;

    dataSource = new MatTableDataSource<Prestamo>();
    displayedColumns: string[] = ['id', 'gamename', 'clientname', 'fechaprestamo', 'fechadevolucion', 'action'];

    constructor(
      private prestamosService: PrestamosService,
      private clienteService: ClienteService,
      private gameService: GameService,
      public dialog: MatDialog
    ) {}

    ngOnInit(): void {
      const pageable: Pageable = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        sort: [
            {
                property: 'id',
                direction: 'ASC',
            },
        ],
      };
      this.prestamosService.getPrestamos(pageable)
      .subscribe((data) => {
        this.dataSource.data = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
      });

      this.clienteService
          .getClientes()
          .subscribe((clientes) => (this.clientes = clientes));

      this.gameService
          .getGames()
          .subscribe((games) => (this.games = games));
    }

    onCleanFilter(): void {
        this.filterClientes = null;
        this.filterGames = null;
        this.filterDate = null;
        this.onSearch();
    }

    onSearch(): void {
        console.log("list")
        const pageable: Pageable = {
              pageNumber: this.pageNumber,
              pageSize: this.pageSize,
              sort: [
                  {
                      property: 'id',
                      direction: 'ASC',
                  },
              ],
          };

        const clientesName = this.filterClientes != null ? this.filterClientes.name : null;
        const gameName = this.filterGames != null ? this.filterGames.title : null;
        const date = this.filterDate;

        this.prestamosService.getPrestamos(pageable, gameName, clientesName, date)
        .subscribe((data) => {
            this.dataSource.data = data.content;
            this.pageNumber = data.pageable.pageNumber;
            this.pageSize = data.pageable.pageSize;
            this.totalElements = data.totalElements;
        });
    }

    loadPage(event?: PageEvent) {
        const pageable: Pageable = {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [
                {
                    property: 'id',
                    direction: 'ASC',
                },
            ],
        };

        if (event != null) {
            pageable.pageSize = event.pageSize;
            pageable.pageNumber = event.pageIndex;
        }

        const clientesName = this.filterClientes != null ? this.filterClientes.name : null;
        const gameName = this.filterGames != null ? this.filterGames.title : null;
        const date = this.filterDate;

        this.prestamosService.getPrestamos(pageable, gameName, clientesName, date).subscribe((data) => {
            this.dataSource.data = data.content;
            this.pageNumber = data.pageable.pageNumber;
            this.pageSize = data.pageable.pageSize;
            this.totalElements = data.totalElements;
        });
    }

    createPrestamos() {
        const dialogRef = this.dialog.open(PrestamoEditComponent, {
            data: {},
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.ngOnInit();
        });
    }

    editPrestamos(prestamos: Prestamo) {
        const dialogRef = this.dialog.open(PrestamoEditComponent, {
            data: { prestamos: prestamos },
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.ngOnInit();
        });
    }

    deletePrestamos(prestamos: Prestamo) {
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
            data: {
                title: 'Eliminar prestamo',
                description:
                    'Atención si borra el prestamo se perderán sus datos.<br> ¿Desea eliminar el prestamo?',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.prestamosService.deletePrestamos(prestamos.id).subscribe((result) => {
                    this.ngOnInit();
                });
            }
        });
    }
}