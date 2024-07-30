import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Password } from 'primeng/password';
import { AuthService } from 'src/app/demo/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';




@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class RegisterComponent {
    form = this.fb.group({
        username : ['test', Validators.required],
        password : ['12341234', Validators.required],
        company : ['test', Validators.required],
        address : ['test', Validators.required],
        cap : ['00000', Validators.required],
        location : ['test', Validators.required],
        pr : ['ss', Validators.required],
        state : ['test', Validators.required],
        phone : ['123', Validators.required],
        email : ['test@test.it', Validators.required],
        website : ['test', Validators.required],
        piva : ['123', Validators.required],
        sdi : ['123', Validators.required],
    })

    constructor(public layoutService: LayoutService, private fb: FormBuilder, private authService: AuthService, public router: Router, private route: ActivatedRoute, private http: HttpClient, public messageService: MessageService,) {
    }

    ngOnInit() {
    }

    register() {
        this.authService.register(this.form.value).subscribe(()=>{
            this.authService.login(this.form.get('email').value, this.form.get('password').value).subscribe(()=>{
                this.router.navigate(['/dashboard']);
            })
            
        })
    }



}
