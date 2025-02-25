import { Component, OnInit, Inject} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from '../model/Cliente';
import { ClienteService } from '../cliente.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cliente-edit',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
  templateUrl: './cliente-edit.component.html',
  styleUrl: './cliente-edit.component.scss'
})
export class ClienteEditComponent implements OnInit {

    cliente: Cliente;

    constructor(
            public dialogRef: MatDialogRef<ClienteEditComponent>,
            @Inject(MAT_DIALOG_DATA) public data: {cliente : Cliente},
            private clienteService: ClienteService
        ) {}
    
        ngOnInit(): void {
          this.cliente = this.data.cliente != null ? this.data.cliente : new Cliente();
        }
    
        onSave() {
            this.clienteService.saveCliente(this.cliente).subscribe(() => {
                this.dialogRef.close();
            });
        }
    
        onClose() {
            this.dialogRef.close();
        }
}
