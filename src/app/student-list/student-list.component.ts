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
        }
        else if ( this.responseResult.OperationResult == "YES" ) {
          this.showSuccess = true;
          this.showError = false;
        }
      } 
    );
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