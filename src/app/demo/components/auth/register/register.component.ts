import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
        company : [null, Validators.required],
        address : [null, Validators.required],
        cap : [null, Validators.required],
        location : [null, Validators.required],
        pr : [null, Validators.required],
        state : [null, Validators.required],
        phone : [null, Validators.required],
        email : [null, Validators.required],
        website : [null, Validators.required],
        piva : [null, Validators.required],
        sdi : [null, Validators.required],
    })

    constructor(public layoutService: LayoutService, private fb: FormBuilder, private authService: AuthService, public router: Router, private route: ActivatedRoute, private http: HttpClient, public messageService: MessageService,) {
    }

    ngOnInit() {
    }

    register() {}



}
