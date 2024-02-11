import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookCategoryService } from '../../services/book-category.service';
import { BookCategoryCreateRequestModel, BookCategoryResponseModel } from '../../types/book-category-model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.scss'],
})
export class BookCategoryComponent implements OnInit, OnDestroy {
  isEditMode = false;
  formGroup: FormGroup;
  subscription: Subscription = new Subscription();
  constructor(
    private formBuilder: FormBuilder,
    private bookCategoryService: BookCategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required]],
      banglaName: [''],
    });

    this.loadData();
  }

  onSave() {
    const requestModel: BookCategoryCreateRequestModel = this.formGroup.value;

    this.subscription.add(
      this.bookCategoryService.save(requestModel).subscribe(
        () => {
          this.router.navigate(['book/book-categories']);
        },
        () => console.log('Not saved')
      )
    );
  }

  onUpdate() {
    const requestModel: BookCategoryCreateRequestModel = this.formGroup.value;

    this.subscription.add(
      this.bookCategoryService.update(requestModel).subscribe(
        () => {
          this.router.navigate(['book/book-categories']);
        },
        () => console.log('Not updated')
      )
    );
  }

  resetForm() {
    this.formGroup.reset();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loadData() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const id: string = params['id'];
      if (id) {
        this.subscription.add(
          this.bookCategoryService.getById<BookCategoryResponseModel>(id).subscribe((data: BookCategoryResponseModel) => {
            const { createdDate, isActive, ...restValue } = data;
            this.formGroup.setValue({
              ...restValue,
            });
          })
        );
        this.isEditMode = true;
      }
    });
  }
}
