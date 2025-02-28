import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrestamosService } from '../prestamo.service';
import { Prestamo } from '../model/Prestamo';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Cliente } from '../../cliente/model/Cliente';
import { Game } from '../../game/model/Game';
import { ClienteService } from '../../cliente/cliente.service';
import { GameService } from '../../game/game.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
    selector: 'app-prestamo-edit',
    standalone: true,
    imports:  [MatButtonModule,
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
    templateUrl: './prestamo-edit.component.html',
    styleUrl: './prestamo-edit.component.scss',
})
export class PrestamoEditComponent implements OnInit {
    prestamo: Prestamo;
    filterClients: Cliente;
    filterGames: Game;
    clients: Cliente[];
    games: Game[]; 

    constructor(
        private clienteService: ClienteService,
        private gameService: GameService,
        public dialogRef: MatDialogRef<PrestamoEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private prestamoService: PrestamosService
    ) {}

    ngOnInit(): void {
        this.prestamo = this.data.prestamo ? Object.assign({}, this.data.prestamo) : new Prestamo();
        const clientsName = this.filterClients != null ? this.filterClients.name : null;
        const gameName = this.filterGames != null ? this.filterGames.title : null;

        if (this.data.prestamo != null) {
            this.prestamo = Object.assign({}, this.data.prestamo);
        }
        else {
            this.prestamo = new Prestamo();
        }

        this.gameService.getGames().subscribe(
            games => {
                this.games = games;

                if (this.prestamo.gamename != null) {
                    let gameFilter: Game[] = games.filter(game => game.title == this.data.prestamo.gamename);
                    if (gameFilter != null) {
                        this.prestamo.gamename = gameFilter[0].title;
                    }
                }
            }
        );

        this.clienteService.getClientes().subscribe(
            clients => {
                this.clients = clients

                if (this.prestamo.clientname != null) {
                    let clientFilter: Cliente[] = clients.filter(client => client.name == this.data.prestamo.clientname);
                    if (clientFilter != null) {
                        this.prestamo.clientname = clientFilter[0].name;
                    }
                }
            }
        );
    }

    onSave() {
        this.prestamo.gamename = this.filterGames.title;
        this.prestamo.clientname = this.filterClients.name;
        console.log(this.prestamo);
        this.prestamoService.savePrestamos(this.prestamo).subscribe(() => {
            this.dialogRef.close();
        });
    }

    onClose() {
        this.dialogRef.close();
    }
}