import {Component}        from '@angular/core';
import {UserService} from "./_services/user.service";
import {Router} from '@angular/router';
import {FormBuilder, Validators} from "@angular/forms";
import {CdSharedModelService} from "../picaso-cd-common/_services/cd-shared-model.service";

@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent {
    error: any;
    public loginForm = this.fb.group({
        username: ["franco", Validators.required],
        password: ["pwdfranco", Validators.required]
    });

    constructor(public fb: FormBuilder, private authService: UserService, private router: Router, private shared: CdSharedModelService) {

    }

    doLogin(event) {
        let value = this.loginForm.value;
        this.authService.login(value.username, value.password).subscribe(
            success => {
                if (success){
                    this.authService.identify(this.authService.getLoginData().cookie[0].value).subscribe(r =>{
                        if(r.success){
                            let data = this.shared.get();
                            data.clinician = r.data;
                            this.shared.update(data);
                            console.log("this.shared.get()");
                            console.log(this.shared.get());
                        }
                    });
                    this.router.navigate(['home']);
                }
            },
            (err) => {
                console.log(err);
                if(err.status ===401){
                    this.error = err;
                }
            }
        );
    }

}