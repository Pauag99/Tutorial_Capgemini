import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PrestamoEditComponent } from '../prestamo-edit/prestamo-edit.component';
import { PrestamoService } from '../prestamo.service';
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


@Component({
    selector: 'app-prestamo-list',
    standalone: true,
    imports: [
        MatButtonModule, 
        MatIconModule, 
        MatTableModule, 
        CommonModule, 
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatPaginator 
    ],
    templateUrl: './prestamo-list.component.html',
    styleUrl: './prestamo-list.component.scss',
})
export class PrestamoListComponent implements OnInit {
    pageNumber: number = 0;
    pageSize: number = 5;
    totalElements: number = 0;

    clientes: Cliente[];
    games: Game[];
    filterGame: Game;
    filterCliente: Cliente;
    filterTitle: string;
    filterName: string;    

    dataSource = new MatTableDataSource<Prestamo>();
    displayedColumns: string[] = ['id', 'gamename', 'clientname', 'fechaprestamo', 'fechadevolucion', 'action'];

    constructor(
        private prestamoService: PrestamoService, 
        private gameService: GameService,
        private clienteService: ClienteService,
        public dialog: MatDialog) {}

    ngOnInit(): void {
        this.loadPage();

        this.gameService.getGames().subscribe((games) => (this.games = games));

        this.clienteService.getClientes().subscribe((clientes) => (this.clientes =clientes));

    }

    onCleanFilter(): void {
        this.filterTitle = null;
        this.filterGame = null;
        this.filterName = null;
        this.filterCliente = null;
        this.onSearch();
    }

    onSearch(): void {
        const title = this.filterTitle;
        const name = this.filterName;
       
        const clienteId =
        this.filterCliente != null ? this.filterCliente.id : null;

        const gameId =
            this.filterGame != null ? this.filterGame.id : null;

        this.gameService
            .getGames(title, gameId)
            .subscribe((games) => (this.games = games));

        this.clienteService
            .getClientes(name, clienteId)
            .subscribe((cliente) => (this.clientes = cliente));
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

        this.prestamoService.getPrestamos(pageable).subscribe((data) => {
            this.dataSource.data = data.content;
            this.pageNumber = data.pageable.pageNumber;
            this.pageSize = data.pageable.pageSize;
            this.totalElements = data.totalElements;
        });
    }

    createPrestamo() {
        const dialogRef = this.dialog.open(PrestamoEditComponent, {
            data: {},
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.ngOnInit();
        });
    }

    editPrestamo(prestamo: Prestamo) {
        const dialogRef = this.dialog.open(PrestamoEditComponent, {
            data: { prestamo: prestamo },
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.ngOnInit();
        });
    }

    deletePrestamo(prestamo: Prestamo) {
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
            data: {
                title: 'Eliminar autor',
                description:
                    'Atención si borra el autor se perderán sus datos.<br> ¿Desea eliminar el autor?',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.prestamoService.deletePrestamo(prestamo.id).subscribe((result) => {
                    this.ngOnInit();
                });
            }
        });
    }
}