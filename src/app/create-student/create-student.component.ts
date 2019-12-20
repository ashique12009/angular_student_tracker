import { Component, OnInit } from '@angular/core';
import { StudentService } from "../services/student-service.service";

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  constructor(private studentService: StudentService) { }

  ngOnInit() {
  }

  /**
   * storeStudent
   */
  public storeStudent(form) 
  {
    //console.log(form.value);
    //console.log(this.studentService.getStudentList());
    this.studentService.storeStudent(form.value);
  }

}
