import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ConfirmationService, MenuItem, Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ElabelService } from '../../service/elabel.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})

export class UserProfileComponent {
  display = false
  breadcrumbItems: MenuItem[] = [];
  form = this.fb.group({
    id : [null, Validators.required],
    username : ['test', Validators.required],
    password : ['12341234', Validators.required], // ignorata in backend 
    company_name : ['test', Validators.required],
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

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService, private service: ElabelService, public layoutService: LayoutService) {
    
    let request = JSON.parse(localStorage.getItem('user'))
    if(request.id)
      this.form.get('username').setValue(request.id)
    if(request.email)
      this.form.get('username').setValue(request.email)
    if(request.company_name)
      this.form.get('company_name').setValue(request.company_name)
    if(request.address)
      this.form.get('address').setValue(request.address)
    if(request.cap)
      this.form.get('cap').setValue(request.cap)
    if(request.location)
      this.form.get('location').setValue(request.location)
    if(request.pr)
      this.form.get('pr').setValue(request.pr)
    /*
    this.service.all(this.userid).subscribe((response: any) => {
        this.labels = response.data
    })       
    */ 
    this.breadcrumbItems = [];
  this.breadcrumbItems.push({ label: 'Profile' });
  }
 

}
