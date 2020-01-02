import { Component, OnInit } from '@angular/core';
import { StudentService } from "../services/student-service.service";

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  registrationIDText = '';
  nameText = '';
  phoneText = '';
  dobText = '';
  templateXMLText = '';

  formData = {}
  
  constructor(private studentService: StudentService) { }

  ngOnInit() {
  }

  /**
   * storeStudent
   */
  public storeStudent(e) 
  {
    // debugger
    this.templateXMLText = e.target.templateXML.value || '';
    if ( this.templateXMLText != '' ) {
      this.formData = {
        registrationID: this.registrationIDText,
        name: this.nameText,
        phone: this.phoneText,
        dob: this.dobText,
        templateXML: this.templateXMLText
      }
      this.studentService.storeStudent(this.formData);
    }
  }
}
