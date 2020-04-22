import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

import { ConfigService } from "../services/config-service.service";
import { AshiqueAngularSdkService } from 'ashique-angular-sdk';

const STORAGE_KEY = 'cloudabis-students';
const TOKEN_STORAGE_KEY = 'cloudabis-token';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private config;

  constructor(
    @Inject(SESSION_STORAGE) private storage: StorageService, 
    private cloudABISSDKService: AshiqueAngularSdkService, 
    private configService: ConfigService,
  ) { }

  /**
   * get access token from sdk
   */
  public getAccessToken()
  {
    // Get config object that hold your api settings value
    this.config = this.configService.constructConfig();

    return this.cloudABISSDKService.getToken(this.config);
  }

  /**
   * get access token from local storage
   */
  public getStorageToken() 
  {
    return this.storage.get(TOKEN_STORAGE_KEY) || '';
  }

  /**
   * store token to local storage
   */
  public storeToken(tokenObject) 
  {
    this.storage.set(TOKEN_STORAGE_KEY, tokenObject.access_token);
  }

  /**
   * get Student List
   */
  public getStudentList() 
  {
    return this.storage.get(STORAGE_KEY) || [];
  }

  /**
   * store Student to local storage
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
    
    //SDK Call
    let getToken = this.getStorageToken();
    let CloudABISBiometricRequest = {
      config: this.config,
      token: getToken,
      registrationID: formValue.registrationID,
      templateXML: JSON.stringify(formValue.templateXML)
    };
    this.cloudABISSDKService.Register(CloudABISBiometricRequest);
  }

  /**
   * check user is registered or not
   */
  public isRegister(registrationID)
  {
    let getToken = this.getStorageToken();
    let CloudABISBiometricRequest = {
      config: this.config,
      token: getToken,
      registrationID: registrationID
    };
    return this.cloudABISSDKService.IsRegister(CloudABISBiometricRequest);
  }

  /**
   * identify Student
   */
  public identifyStudent(templateXML) 
  {
    //SDK Call
    let getToken = this.getStorageToken();
    let CloudABISBiometricRequest = {
      config: this.config,
      token: getToken,
      templateXML: JSON.stringify(templateXML)
    };
    return this.cloudABISSDKService.Identify(CloudABISBiometricRequest);
  }

  /**
   * remove Student
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