import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-info',
    imports: [MatDialogModule, MatButtonModule],
    templateUrl: './info.component.html',
    styleUrl: './info.component.scss'
})
export class InfoComponent {}
