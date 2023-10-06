import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BookCreateRequestModel, BookResponseModel, BookUpdateRequestModel } from '../../types/book-model';
import { OptionsModel } from 'src/app/shared/models/options-model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy{
  isEditMode = false;
  formGroup: FormGroup;
  subscription: Subscription = new Subscription();
  categories$: Observable<Array<OptionsModel>> = this.bookService.getBookCategories();
  editions$: Observable<Array<OptionsModel>> = this.bookService.getBookEditions();
  persons$: Observable<Array<OptionsModel>> = this.bookService.getPersonOptions();
  constructor(private formBuilder: FormBuilder, private bookService: BookService, private router: Router,
              private activatedRoute: ActivatedRoute) {

  } 

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [null],
      title: ['', [Validators.required]],
      author:           [''],
      publisher:        [''],
      publicationDate:  [''],
      coverPhoto:       [''],
      price:            ['', [Validators.required]],
      quantity:         ['', [Validators.required]],
      availability:     [true, [Validators.required]],
      detail:           [''],
      condition:        [null, [Validators.required]],
      editionId:        [null, [Validators.required]],
      languageId:       [null, [Validators.required]],
      categoryId:       [null, [Validators.required]],
      isPriceNegotiable:[true, [Validators.required]],
      personId:         [null, [Validators.required]]
    });
    
    this.loadData();
  }

  onSave() {
    const requestModel: BookCreateRequestModel = this.formGroup.value;

    this.subscription.add(this.bookService.save(requestModel).subscribe(()=> {
      this.router.navigate(['book/books']);
    },()=> console.log('Not saved')));
  }

  onUpdate() {
    const requestModel: BookUpdateRequestModel = this.formGroup.value;

    this.subscription.add(this.bookService.update(requestModel).subscribe(()=> {
      this.router.navigate(['book/books']);
    },()=> console.log('Not updated')));
  }

  resetForm() {
    if(this.isEditMode) {
      this.router.navigate(['book/books']);
    } else {
      this.formGroup.reset();
    }
    return false;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }  

  loadData() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const id: string = params['id'];
      if(id) {
        this.subscription.add(this.bookService.getById<BookResponseModel>(id).subscribe((data: BookResponseModel) => {
          const {isActive, ...restValue} = data;
          this.formGroup.setValue({
            ...restValue
          });
        }));

        this.isEditMode = true;
      }
    })
  }
}
