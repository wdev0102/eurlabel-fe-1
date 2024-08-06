import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ElabelService } from '../../service/elabel.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
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

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService, private service: ElabelService, public layoutService: LayoutService) {
    console.log("test")
    debugger
    let request = JSON.parse(localStorage.getItem('user'))
    debugger
    /*
    this.service.all(this.userid).subscribe((response: any) => {
        this.labels = response.data
    })       
    */ 
  }

}
