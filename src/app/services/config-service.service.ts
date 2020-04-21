import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

    public CloudABIS_API_URL = 'https://fpsvr101.cloudabis.com/v1/';
    public CloudABISAppKey = 'b8f1ff51a6e644b2bf29db85e9582d3a';
    public CloudABISCustomerKey = 'D58F77CDB5324DF293A626685167A166';
    public CloudABISSecretKey = 'YZr81CpH4jyQP2FjL+aPFRyuhHQ=';
    public ENGINE_NAME = 'FPFF02';
    public TEMPLATE_FORMAT = 'ISO';

    constructor() { }

    public constructConfig(){
        return {
            CloudABIS_API_URL: this.CloudABIS_API_URL,
            CloudABISAppKey: this.CloudABISAppKey,
            CloudABISSecretKey: this.CloudABISSecretKey,
            CloudABISCustomerKey: this.CloudABISCustomerKey,
            ENGINE_NAME: this.ENGINE_NAME,
            TEMPLATE_FORMAT: this.TEMPLATE_FORMAT
        }
    }

}