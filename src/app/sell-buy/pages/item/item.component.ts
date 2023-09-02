import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { Observable } from 'rxjs';
import { SubCategoryService } from '../../services/sub-category.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemService} from "../../services/item.service";
import {ItemRequestModel} from "../../models/item.model";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit{
  categories$: Observable<OptionsModel[]> | undefined;
  subCategories$: Observable<OptionsModel[]> | undefined;
  itemForm: FormGroup;
  isEditMode = false;

  constructor(private categoryService: CategoryService, private subCategoryService: SubCategoryService,
              private formBuilder: FormBuilder, private itemService: ItemService) {
    this.createForm();
  }
  ngOnInit(): void {
    this.loadCategories();
  }

  onCategoryChange() {
    const {category} = this.itemForm.value;
    this.itemForm.controls['subCategoryId'].reset();
    this.subCategories$ = this.subCategoryService.getByCategoryId(category);
  }

  onItemAdd() {
    const requestModel: ItemRequestModel = {...this.itemForm.value,condition: +this.itemForm.value.condition};

    this.itemService.addItem(requestModel).subscribe(value => {
      this.itemForm.reset();
    });
  }
  onItemUpdate() {
    console.log('updated');
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
      id: ['']
    });
  }
}
