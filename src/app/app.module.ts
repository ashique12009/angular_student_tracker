import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { StudentListComponent } from './student-list/student-list.component';
import { CreateStudentComponent } from './create-student/create-student.component';

import { StudentService } from "./services/student-service.service";
import { ConfigService } from "./services/config-service.service";
import { AshiqueAngularSdkService } from 'ashique-angular-sdk';

const appRoutes: Routes = [
  { path: '', component: StudentListComponent },
  { path: 'student-list', component: StudentListComponent },
  { path: 'create-student', component: CreateStudentComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    CreateStudentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    StudentService,
    ConfigService,
    AshiqueAngularSdkService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
