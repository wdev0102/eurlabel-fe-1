import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ElabelService } from '../../service/elabel.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

    labels = []
    published = []
    draft = []
    display = false
    radio = new FormControl()
    name = new FormControl()
    sku = new FormControl()
    id = new FormControl()
    types = []

    constructor(private router: Router, private service: ElabelService, public layoutService: LayoutService) {
        this.service.all().subscribe((response: any) => {
            this.labels = response.data
        })
    }

    ngOnInit() {

    }

    submit() {
        this.service.create({
            'public_id' : this.id.value,
            'sku' : this.sku.value,
            'product_name' : this.name.value
        }).subscribe((response) => {
            debugger
            this.router.navigateByUrl('/elabel/' + response.id);
        })
    }


    open(element) {
        this.router.navigateByUrl('customer/' + element.id)
    }
}
