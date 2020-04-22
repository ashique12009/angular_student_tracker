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
  private config;
  regID = "";
  showSuccess: boolean = false;
  showError: boolean = false;
  responseResult: any;
  templateXMLText = '';
  noticeMessage = '';

  constructor(
    private studentService: StudentService, 
    private router: Router
  ) { }

  ngOnInit() {
    // Get access token
    var tokenObject = this.studentService.getAccessToken();

    tokenObject.then(data => {
      // Save access token to storage
      this.studentService.storeToken(data);
    });

    // Get student list
    this.studentList = this.studentService.getStudentList();
    return this.studentList;
  }

  /**
   * checking is register or not
   */
  public isRegister()
  {
    let returnResponse = this.studentService.isRegister(this.regID);
    returnResponse.then((data) => 
      {
        this.responseResult = data;
        if ( this.responseResult.OperationResult == "NO" ) {
          this.showError = true;
          this.showSuccess = false;
          this.noticeMessage = "ID not found!";
        }
        else if ( this.responseResult.OperationResult == "YES" ) {
          this.showSuccess = true;
          this.showError = false;
          this.noticeMessage = "ID found!";
        }
        else if ( this.responseResult.OperationResult == "INVALID_REQUEST" ) {
          this.showSuccess = false;
          this.showError = true;
          this.noticeMessage = "Ivalid request";
        }
      } 
    );
  }

  /**
   * identifying
   */
  public identifyNow(e)
  {
    let templateXML = e.target.templateXML.value || '';
    if ( templateXML != '' ) {
      let returnResponse = this.studentService.identifyStudent(templateXML);
      returnResponse.then((data) => 
        {
          this.responseResult = data;
          if ( this.responseResult.OperationResult == "NO_MATCH_FOUND" ) {
            this.showError = true;
            this.showSuccess = false;
            this.noticeMessage = "Did not Match!";
          }
          else if ( this.responseResult.OperationResult == "MATCH_FOUND" ) {
            this.showSuccess = true;
            this.showError = false;
            this.noticeMessage = this.responseResult.DetailResult[0].ID + " Match found!";
          }
          else if ( this.responseResult.OperationResult == "INVALID_ISO_TEMPLATE" ) {
            this.showSuccess = false;
            this.showError = true;
            this.noticeMessage = "Ivalid ISO template";
          }
        }
      );
    }
    else {
      this.showSuccess = false;
      this.showError = true;
      this.noticeMessage = "Please first capture your biometric data!";
    }
  }

  /**
   * deleteStudent
   */
  public deleteStudent(registerID) 
  {
    this.studentService.removeStudent(registerID);
    this.router.navigate(['/student-list']);
  }

}