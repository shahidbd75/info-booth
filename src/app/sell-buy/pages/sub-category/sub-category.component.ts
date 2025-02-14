import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { filter, map, Observable, Subscription, switchMap } from 'rxjs';
import { OptionsModel } from '../../../shared/models/options-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubCategoryService } from '../../services/sub-category.service';

import { ActivatedRoute, Router, Params } from '@angular/router';
import { ItemSubCategoryDetailResponseModel } from '../../models/sub-category.model';
import { NotificationService } from 'src/app/lib/material/notification/services/notification.service';

@Component({
    selector: 'app-sub-category',
    templateUrl: './sub-category.component.html',
    styleUrls: ['./sub-category.component.scss'],
    standalone: false
})
export class SubCategoryComponent implements OnInit, OnDestroy {
  categories$: Observable<Array<OptionsModel>>;
  subCategoryForm: FormGroup;
  subscription:Subscription;
  editMode = false;
  constructor(
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
    this.initializeForm();

    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onAdd() {
    const { name, categoryId: itemCategoryId } = this.subCategoryForm.value;
    this.subscription = this.subCategoryService.addSubcategory({ name, itemCategoryId }).subscribe({
      next:() => {
        this.notificationService.success('Saved successfully');
        this.subCategoryForm.reset({ category: itemCategoryId });
      },
      error: (error) => {
        this.notificationService.error('Not saved');
      }
    });
  }

  onUpdate() {
    const { name, categoryId: itemCategoryId, id } = this.subCategoryForm.value;
    this.subscription = this.subCategoryService.updateSubcategory({ name, itemCategoryId, id, isActive: true })
    .subscribe({
      next: () => this.router.navigate([`buy-sell/sub-categories`]),
      error: () => this.notificationService.error('Not updated'),
    });
  }
  initializeForm() {
    this.subCategoryForm = this.fb.group({
      categoryId: [null, [Validators.required]],
      name: ['', [Validators.required]],
      id: [null],
    });
  }

  loadData() {
    this.subscription = this.route.params.pipe(map((param: Params) => param['id']), filter(item => item),switchMap((id) =>
        this.subCategoryService.getSubcategoryById(id)
      )).subscribe({
      next: (subCategory: ItemSubCategoryDetailResponseModel) => {
        this.editMode = true;
        const {categoryName,...formValue} = subCategory;
        this.subCategoryForm.setValue(formValue)
      }
    })
  }

  onClear() {
    this.subCategoryForm.reset();
    this.router.navigate(['buy-sell/sub-categories']);
  }
}
