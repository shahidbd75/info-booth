import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Observable} from "rxjs";
import {OptionsModel} from "../../../shared/models/options-model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubCategoryService} from "../../services/sub-category.service";
import {NotificationService} from "../../../lib/ngbootstrap/services/notification.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit{
  categories$: Observable<Array<OptionsModel>>;
  subCategoryForm: FormGroup;
  editMode = false;
  constructor(private categoryService: CategoryService, private subCategoryService: SubCategoryService , private fb: FormBuilder,
              private notificationService: NotificationService, private router: Router) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
    this.initializeForm();
  }

  onAdd() {
    const {name,categoryId: itemCategoryId } = this.subCategoryForm.value;
    this.subCategoryService.addSubcategory({name,itemCategoryId}).subscribe(()=>
    {
      this.notificationService.success('Saved successfully');
      this.subCategoryForm.reset({category: itemCategoryId});
    });
  }

  onUpdate() {
    const {name,categoryId: itemCategoryId, id } = this.subCategoryForm.value;
    this.subCategoryService.updateSubcategory({name,itemCategoryId,id,isActive: true})
      .subscribe(()=>console.log('updated'));
  }
  initializeForm() {
    this.subCategoryForm = this.fb.group({
      categoryId: [null, [Validators.required]],
      name: ['', [Validators.required]],
      id: [null]
    })
  }

  onClear() {
    this.subCategoryForm.reset();
    this.router.navigate(['buy-sell/sub-categories']);
  }
}
