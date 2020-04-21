import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StudentService } from "../services/student-service.service";
import { ConfigService } from "../services/config-service.service";

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

  access_token = '';

  formData = {}

  errorMsg = false;
  
  constructor(
    private studentService: StudentService, 
    private configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit() {
    this.access_token = this.studentService.getStorageToken();
  }

  /**
   * storeStudent
   */
  public storeStudent(e) 
  {
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
      this.router.navigate(['/student-list']);
    } 
    else {
      this.errorMsg = true;
    }
  }
}
