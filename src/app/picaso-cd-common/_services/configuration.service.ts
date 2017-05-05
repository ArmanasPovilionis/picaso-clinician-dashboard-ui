const BASE_API_URL = "https://localhost:8080/api/";
const config = {
    "CLINICIAN_DASHBOARD_URL": BASE_API_URL + "cd/",
    "API": {
        "FHIR_CODING_ADD_URL": BASE_API_URL + "fhir/add/coding",
        "FHIR_CODING_URL": BASE_API_URL + "fhir/coding/",
        "FHIR_RESOURCE_URL": BASE_API_URL + "picaso/resource/",
        "FHIR_CAREPLAN_URL": BASE_API_URL + "picaso/resource/careplan/",
        "FHIR_CAREPLAN_TEMPLATES_URL": BASE_API_URL + "picaso/resource/careplan/templates",
        "AUTHENTICATION_URL": BASE_API_URL + "picaso/authenticate/login",
        "IDENTITY_URL": BASE_API_URL + "picaso/authenticate/identify",
        "PATIENTS_URL": BASE_API_URL + "picaso/authenticate/patients",
    },
    "common": {
        "defaultHttpReqOptions": null
    },
    "NM": {},
    "CD": {},
    "DRB": {},
    "RM": {}
};

import {Injectable} from '@angular/core';
import {Headers} from "@angular/http";

@Injectable()
export class ConfigurationService {
    private config: any;
    constructor() {
        this.config = config;
        let headers = new Headers ();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        config.common.defaultHttpReqOptions = {
            headers: headers
        };
    }
    get(): any {
        return this.config;
    }
}
