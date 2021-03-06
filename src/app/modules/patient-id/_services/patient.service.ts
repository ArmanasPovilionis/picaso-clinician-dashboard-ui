import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Headers, Http} from "@angular/http";
import {ConfigurationService} from "../../../picaso-cd-common/_services/configuration.service";

@Injectable()
export class PatientService {
    patients: any = [];

    constructor(private config: ConfigurationService, private http: Http) {
    }

    get() {
        return this.patients;
    }

    loadPatients(upid) {
        let req = {
            "identify_user": {
                "UPID": upid
            }
        };
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        if (this.patients.length > 0) {
            return Observable.create((observer: any) => {
                observer.next(this.patients);
            });
        }
        else {
            return this.http.post(this.config.get().API.PATIENTS_URL, req, {
                headers: headers
            }).subscribe(res => {
                if (res.text().trim().length > 0)
                    this.patients = res.json();
                return this.patients;
            })
        }
    }

    filter(query) {
        let filteredList = [];
        if (query !== "") {
            if(query === "*")
                return this.patients;
            filteredList = this.patients.filter(function (el) {
                return el["display"].toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
        }
        return filteredList;
    }
}
