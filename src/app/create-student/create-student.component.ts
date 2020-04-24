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
  responseResult: any;
  showSuccess: boolean = false;
  showError: boolean = false;
  noticeMessage: string = "";
  
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
      
      let returnResponse = this.studentService.storeStudent(this.formData);
      returnResponse.then((data) => {
        this.responseResult = data;
        if ( this.responseResult.OperationResult == "SUCCESS" || this.responseResult.OperationResult == "YES" ) {
          this.showError = false;
          this.showSuccess = true;
          this.noticeMessage = "Insert operation done successfully!";
        }
        else if ( this.responseResult.OperationResult == "MATHC_FOUND" ) {
          this.showError = true;
          this.showSuccess = false;
          this.noticeMessage = "Mathc found! Please put another biometric data.";
        }
      });
    } 
    else {
      this.errorMsg = true;
    }
  }
}
