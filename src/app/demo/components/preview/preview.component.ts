import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ElabelService } from '../../service/elabel.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  @Input() form: FormGroup
  @Input() sub_image = ''
  @Input() preview_image = ''
  show_portion:boolean=false

  constructor(private fb: FormBuilder, private t: TranslateService, private service: ElabelService, private confirmationService: ConfirmationService, private messageService: MessageService, private _location: Location, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    console.log(this.form.value)
  }

  save() {
    this.service.save(this.form.value).subscribe((response) => {
      this.showBottomCenter()
    })
  }

  back() {
    this._location.back();
  }

  showBottomCenter() {
    this.messageService.add({ key: 'tc', severity: 'success', summary: 'Successo', detail: 'Il record è stato aggiornato' });
  }

  get rules(): FormArray {
    return this.form.get('rules') as FormArray;
  }

  get formIngredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

}
