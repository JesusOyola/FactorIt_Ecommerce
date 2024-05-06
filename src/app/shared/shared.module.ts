import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {
  NgbAlertModule,
  NgbDatepickerModule,
 
  
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, NgbDatepickerModule, NgbAlertModule, FormsModule],
  exports: [NavbarComponent],
})
export class SharedModule {}
