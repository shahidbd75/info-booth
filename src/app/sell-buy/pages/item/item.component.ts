import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { Observable } from 'rxjs';
import { SubCategoryService } from '../../services/sub-category.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemService} from "../../services/item.service";
import {ItemCreateRequestModel, ItemUpdateRequestModel} from "../../models/item.model";
import { PersonClientService } from 'src/app/personnel/services/person-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit{
  categories$: Observable<OptionsModel[]> | undefined;
  subCategories$: Observable<OptionsModel[]> | undefined;
  persons$: Observable<OptionsModel[]> | undefined;
  measurementTypes$: Observable<OptionsModel[]> | undefined;
  itemForm: FormGroup;
  isEditMode = false;

  constructor(private categoryService: CategoryService, private subCategoryService: SubCategoryService,
              private formBuilder: FormBuilder, private itemService: ItemService, private personService: PersonClientService,
              private router: Router) {
    this.createForm();
  }
  ngOnInit(): void {
    this.loadCategories();
    this.persons$ = this.personService.getPersonOptions();
    this.measurementTypes$ = this.itemService.getMeasurementTypes();
  }

  onCategoryChange() {
    const {category} = this.itemForm.value;
    this.itemForm.controls['subCategoryId'].reset();
    this.subCategories$ = this.subCategoryService.getByCategoryId(category);
  }

  onItemAdd() {
    const { condition,measurementTypeId,transactionType, ...restValue } = this.itemForm.value;
    const requestModel: ItemCreateRequestModel = {...restValue,condition: +condition, measurementTypeId: +measurementTypeId
    ,transactionType: +transactionType};
    this.itemService.addItem(requestModel).subscribe(_value => {
      this.itemForm.reset();
      this.goToListPage();
    }, (error) => console.log(error));
  }
  onItemUpdate() {
    const { condition,measurementTypeId,transactionType, ...restValue } = this.itemForm.value;
    const requestModel: ItemUpdateRequestModel = {...restValue,condition: +condition, measurementTypeId: +measurementTypeId
    ,transactionType: +transactionType};

    this.itemService.updateItem(requestModel).subscribe((_value) => {
      this.itemForm.reset();
      this.goToListPage();
    }, (error) => console.log(error));
  }

  loadCategories() {
    this.categories$ = this.categoryService.getCategories();
  }

  createForm() {
    this.itemForm = this.formBuilder.group({
      category: [null],
      name: ['',[Validators.required]],
      localName: [''],
      imageUrl: [''],
      banglaName: [''],
      shortDescription: ['', [Validators.required]],
      description: [''],
      condition: [null],
      subCategoryId: [null, [Validators.required]],
      personId: [null, [Validators.required]],
      measurementTypeId:[null],
      transactionType: [null,[Validators.required]],
      id: ['']
    });
  }

  private goToListPage() {
    this.router.navigate(['/buy-sell/items']);
  }
}
