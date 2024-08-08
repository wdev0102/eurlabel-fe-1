import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { Password } from 'primeng/password';
import { AuthService } from 'src/app/demo/service/auth.service';
import { UserService } from 'src/app/demo/service/user.service';
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
export class RegisterComponent implements OnInit{
    @Input() edit = false
    msgs: Message[] = [];
    email = ''
    user : any = {}
    
    @Input() form = this.fb.group({
        id : [null, Validators.required],
        username : ['', Validators.required],
        password : ['', Validators.required],
        company_name : ['', Validators.required],
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
        company_name : 'test',
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

    constructor(public layoutService: LayoutService,private userService: UserService,  private service: MessageService, private fb: FormBuilder, private authService: AuthService, public router: Router, private route: ActivatedRoute, private http: HttpClient, public messageService: MessageService,) {
        if(this.dummyData)
            this.form.patchValue(this.dummyData)
    }

    ngOnInit() {
        if(this.edit) {
            let request = JSON.parse(localStorage.getItem('user'))
            this.user = request
            console.log(request)
        }
    }

    save() {
        debugger
        this.edit ? this.editSubmit() : this.registerSubmit()
    }

    editSubmit() {
        this.authService.editProfile(this.form.value).subscribe(
            success => {
            this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Message sent' });
            },
            error => {
                this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
            }
            
        )
    }

    registerSubmit() {
        this.authService.register(this.form.value).subscribe(()=>{
            this.authService.login(this.form.get('email').value, this.form.get('password').value).subscribe(()=>{
                this.router.navigate(['/dashboard']);
            })
            
        })
    }

    onBasicUpload() {
        this.userService.get(this.user.id).subscribe((response)=>{
            localStorage.setItem('user', JSON.stringify(response.data))
            this.user = response.data
            this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Message sent' });
        })
    }

}
