import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ConfirmationService, MenuItem, Message, MessageService } from 'primeng/api';
import { ElabelService } from '../../service/elabel.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-elabel',
  templateUrl: './elabel.component.html',
  styleUrls: ['./elabel.component.scss']
})
export class ElabelComponent {
  form: FormGroup
  id = ''
  brand = ''
  preview_image = ''
  sub_image = ''
  user_id = ''
  breadcrumbItems: MenuItem[] = [];
  filteredCountries: any[] = [];
  geographical_indication = 0
  options = []
  uploadedFiles = []
  type = new FormControl()
  sustainabilityImage = new FormControl()
  previewImage = new FormControl()
  ingredient = new FormControl()
  tmp = new FormControl()

  countries = [];
  states = [];
  consumption = [];
  containers = [];
  materials = [];
  packages = [];
  productType = [];
  types = [];
  fullIngredientList = [];
  ingredientPicked = [];
  ingredients = [];
  msgs: Message[] = [];
  sidebarVisible: boolean = false;



  constructor(private fb: FormBuilder, private t: TranslateService, private service: ElabelService, private confirmationService: ConfirmationService, private messageService: MessageService, private _location: Location, private route: ActivatedRoute) {
    let request = JSON.parse(localStorage.getItem('user'))
    const user_id = request.id

    this.form = this.fb.group({
      id: [null, Validators.required],
      qr: [null, Validators.required],
      public_id: [null, Validators.required],
      user_id: [''],
      name: [null, Validators.required],
      alcohol_content_percentage: [null],
      net_content: [null],
      product_name: [null, Validators.required],
      sku: [null],
      country: [null, Validators.required],
      vintage_year: [null],
      packages: [null],
      geographical_indication: [null],
      description: [null],
      product_varieties: [null],
      energy_kj: ['0', Validators.required],
      energy_kcal: ['0', Validators.required],
      fat: ['0', Validators.required],
      fat_sat: ['0', Validators.required],
      carb: ['0', Validators.required],
      carb_sugar: ['0', Validators.required],
      protein: ['0', Validators.required],
      salt: ['0', Validators.required],
      drive: [false],
      pregnant: [false],
      age: [false],
      sustainibility_bio: [null],
      sustainibility_message: [null],
      rules: new FormArray([]),
      ingredients: new FormArray([]),
      type: [null, Validators.required]
    })





    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'E-labels' });

    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      const brand = params.get('brand');
      if (brand)
        this.brand = brand
      this.service.getOptions().subscribe((response) => {
        const data = response.data
        this.consumption = data.consumption.map(e => { e.value = e.id; return e })
        let containers = data.containers.map(e => { e.value = e.id; return e })
        this.geographical_indication = data.countries.map(e => { e.value = e.id; return e })
        let materials = data.materials.map(e => { e.value = e.id; return e })
        this.states = data.states.map(e => { e.value = e.nome_stati; return e })
        this.packages = data.packages.map(e => { e.value = e.id; return e })
        this.productType = data.productType.map(e => { e.value = e.id; return e })
        this.types = data.types.map(e => { e.value = e.id; return e })
        this.fullIngredientList = data.ingredients
        let ingredients = data.ingredients.map(e => { e.value = e.id; return e })

        containers = containers
          .reduce((acc, obj) => {
            const key = obj.group;
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
          }, {});
        for (let c in containers) {
          const key = c;
          const items = containers[c];
          this.containers.push({
            label: c,
            items: items
          })
        }

        materials = materials
          .reduce((acc, obj) => {
            const key = obj.group;
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
          }, {});
        for (let c in materials) {
          const key = c;
          const items = materials[c];
          this.materials.push({
            label: c,
            items: items
          })
        }

        ingredients = ingredients
          .reduce((acc, obj) => {
            const key = obj.group;
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
          }, {});
        for (let c in ingredients) {
          const key = c;
          const items = ingredients[c];
          this.ingredients.push({
            label: c,
            items: items
          })
        }

      })

      if (id) {
        this.id = id
        this.get()
      }
    });
  }

  save() {
    console.log(this.form.value)
    this.service.save(this.form.value).subscribe(
      (response) => {
        this.showBottomCenter()
        this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Message sent' });
      },
      error => {
        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
      }
    )
  }

  back() {
    this._location.back();
  }
  onChangeIngredient($event) {
    const id = $event.value
    const option = this.fullIngredientList.filter((e) => e.id == id)
    this.ingredientPicked.push(option[0])
    this.formIngredients.push(this.fb.group(option))
  }

  onDeleteIngredient($event) {
    const id = $event.value
    console.log(this.ingredientPicked)
    const index = this.ingredientPicked.findIndex(item => item.id === $event);
    const newArray = this.ingredientPicked.filter(item => item.id !== index);
    this.ingredientPicked.splice(index, 1);
    this.formIngredients.removeAt(index); // Rimuove il controllo all'indice specificato


  }

  searchCountry(event: any) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.countries.length; i++) {
      const country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }

  deleteRecord(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Confermi di voler eliminare il record?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteRecord(this.id).subscribe((response) => {
          this.back()
        })
      },
      reject: () => {
      }
    });
  }

  showBottomCenter() {
    this.messageService.add({ key: 'tc', severity: 'success', summary: 'Successo', detail: 'Il record è stato aggiornato' });
  }

  addRule() {
    const rule = this.fb.group({ recycling_rule_containers_id: new FormControl(), recycling_rule_materials_id: new FormControl() })
    this.rules.push(rule)
  }

  removeRule(i: number) {
    this.rules.removeAt(i);
  }

  get rules(): FormArray {
    return this.form.get('rules') as FormArray;
  }

  get formIngredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  onBasicUpload() {
    this.get()
  }
  get() {
    this.service.get(this.id).subscribe((response) => {
      this.form.patchValue(response.data)

      if (response.data.vintage_year) {
        this.form.get('vintage_year').setValue(new Date(response.data.vintage_year))
      }

      if (response.data.geographical_indication.length) {
        this.form.get('geographical_indication').setValue(parseInt(response.data.geographical_indication[0].geographical_indication_id))
      }

      for (let option of response.data.ingredients) {
        this.ingredientPicked.push(option)
        this.formIngredients.push(this.fb.group(option))
      }
      for (let option of response.data.recycling_rules) {
        option.recycling_rule_materials_id = parseInt(option.recycling_rule_materials_id)
        option.recycling_rule_containers_id = parseInt(option.recycling_rule_containers_id)
        this.rules.push(this.fb.group(option))
      }

      if (response.data.type) {
        this.form.get('type').setValue(parseInt(response.data.type))
      }
      if (response.data.packages.length) {
        this.form.get('packages').setValue(parseInt(response.data.packages[0].package_id))
      }

      if (response.data.sub_image) {
        this.sub_image = response.data.sub_image
      }

      if (response.data.preview_image) {
        this.preview_image = response.data.preview_image
      }


      this.breadcrumbItems.push({ label: this.form.get('product_name').value });
      this.breadcrumbItems = [...this.breadcrumbItems]
    })
  }


}
