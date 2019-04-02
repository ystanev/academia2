import { NgModule } from  '@angular/core';
import { MatSelectModule, MatTabsModule,MatNativeDateModule,MatDatepickerModule,MatIconModule,MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule,MatFormFieldModule,MatInputModule,MatRadioModule,MatListModule } from  '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
imports: [MatSelectModule,MatTabsModule,MatNativeDateModule,MatDatepickerModule,MatIconModule,MatButtonModule,MatCheckboxModule, MatToolbarModule,FormsModule, MatCardModule,MatFormFieldModule,MatInputModule,MatListModule,MatRadioModule,],

exports: [MatSelectModule,MatTabsModule,MatNativeDateModule,FormsModule,
MatDatepickerModule,MatIconModule,MatButtonModule,MatCheckboxModule, MatToolbarModule, MatCardModule,MatFormFieldModule,MatInputModule,MatListModule,MatRadioModule,],

})

export class MyMaterialModule { }