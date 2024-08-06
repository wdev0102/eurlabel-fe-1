import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ElabelService } from '../../service/elabel.service';
import { UserService } from '../../service/user.service';
import { MenuItem } from 'primeng/api';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    labels = []
    published = []
    draft = []
    display = false
    companyName = new FormControl()
    radio = new FormControl()
    name = new FormControl()
    sku = new FormControl()
    id = new FormControl()
    types = []
    userid = 0
    user : any = {}
    items: MenuItem[];
    items_brand: MenuItem[];
    items_elabel: MenuItem[];
    
    constructor(private router: Router, private userService: UserService, private service: ElabelService, public layoutService: LayoutService) {

        let request = JSON.parse(localStorage.getItem('user'))
        this.companyName.setValue(request.company_name)   
        this.userid = request.id     
        this.user = request
        this.service.all(this.userid).subscribe((response: any) => {
            this.labels = response.data
        })        
    }

    onBasicUpload() {
        this.userService.get(this.userid).subscribe((response)=>{
            localStorage.setItem('user', JSON.stringify(response.data))
            this.user = response.data
        })
    }

    ngOnInit() {
        this.items = [
            { label: 'Duplica', icon: 'pi pi-fw pi-copy' }
        ];
        this.items_brand = [
            { label: 'Modifica Brand', icon: 'pi pi-fw pi-pencil' },
            { label: 'Qr Code', icon: 'pi pi-fw pi-qrcode' },
            { label: 'Nuova E-Label', icon: 'pi pi-fw pi-plus' },
        ];
        this.items_elabel = [
            { label: 'Modifica Brand', icon: 'pi pi-fw pi-pencil' },
            { label: 'Qr Code', icon: 'pi pi-fw pi-qrcode' },
            { label: 'Duplica', icon: 'pi pi-fw pi-copy' },
        ];



    }

    submit() {
        this.service.create({
            'public_id' : this.id.value,
            'sku' : this.sku.value,
            'product_name' : this.name.value
        }).subscribe((response) => {
            this.router.navigateByUrl('/elabel/' + response.id);
        })
    }


    open(element) {
        this.router.navigateByUrl('customer/' + element.id)
    }

    save() {
        /*
        this.edit = false
        let request = JSON.parse(localStorage.getItem('user'))
        request.company_name = this.companyName.value;
        this.userService.save(request).subscribe((response)=>{
            localStorage.setItem('user', JSON.stringify(response))
            this.user = response
            this.edit = false;
        })
        */
    }

}
