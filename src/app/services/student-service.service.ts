import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_KEY = 'cloudabis-students';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public studentList;

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

  /**
   * getStudentList
   */
  public getStudentList() 
  {
    this.studentList = this.storage.get(STORAGE_KEY) || [];
    return this.studentList;
  }

  /**
   * storeStudent
   */
  public storeStudent(formValue) 
  {
    let currentStudentList = this.storage.get(STORAGE_KEY) || [];
    // push new student to array
    currentStudentList.push({
      registrationID: formValue.registrationID,
      name: formValue.name,
      phone: formValue.phone,
      dob: formValue.dob 
    });

    // insert updated array to local storage
    this.storage.set(STORAGE_KEY, currentStudentList);
  }

  /**
   * removeStudent
   */
  public removeStudent(registrationID) 
  {
    let currentStudentList = this.storage.get(STORAGE_KEY) || [];
    let matchIndex = 0;
    let matchFlag = false;
    for ( let i = 0; i < currentStudentList.length; i++ ) { 
      if ( currentStudentList[i].registrationID == registrationID ) {
        matchIndex = i;
        matchFlag = true;
        break;
      }
    }
    if ( matchFlag == true ) {
      currentStudentList.splice(matchIndex, 1);
      // remove full object then assign the new array
      this.storage.remove(STORAGE_KEY);
      // insert updated array to local storage
      this.storage.set(STORAGE_KEY, currentStudentList);
    }
  }
}
