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
        username : ['', Validators.required],
        password : ['', Validators.required],
        company : ['', Validators.required],
        address : ['', Validators.required],
        cap : ['', Validators.required],
        location : ['', Validators.required],
        pr : ['', Validators.required],
        state : ['', Validators.required],
        phone : ['', Validators.required],
        email : ['', Validators.required],
        website : ['', Validators.required],
        piva : ['', Validators.required],
        sdi : ['', Validators.required],
    })

    dummyData : {
        username : 'test',
        password : '12341234',
        company : 'test',
        address : 'test',
        cap : '00000',
        location : 'test',
        pr : 'ss',
        state : 'test',
        phone : '123',
        email : 'test@test.it',
        website : 'test',
        piva : '123',
        sdi : '123',
    }

    constructor(public layoutService: LayoutService, private fb: FormBuilder, private authService: AuthService, public router: Router, private route: ActivatedRoute, private http: HttpClient, public messageService: MessageService,) {
        if(this.dummyData)
            this.form.patchValue(this.dummyData)
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
