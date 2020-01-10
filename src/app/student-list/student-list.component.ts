import { Component, OnInit } from '@angular/core';
import { StudentService } from "../services/student-service.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit {

  studentList = [];

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit() {
    console.log(this.studentService.getStudentList());
    this.studentList = this.studentService.getStudentList();
    return this.studentList;
  }

  /**
   * deleteStudent
   */
  public deleteStudent(registerID) 
  {
    console.log(registerID);
    this.studentService.removeStudent(registerID);
    this.router.navigate(['/student-list']);
  }

}