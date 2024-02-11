import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookCategoriesComponent } from './pages/book-categories/book-categories.component';
import { BookCategoryComponent } from './pages/book-category/book-category.component';
import { EditionsComponent } from './pages/editions/editions.component';
import { EditionComponent } from './pages/edition/edition.component';
import { BooksComponent } from './pages/books/books.component';
import { BookComponent } from './pages/book/book.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModule } from '../lib/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { BookCategoryService } from './services/book-category.service';
import { EditionService } from './services/edition.service';
import { BookService } from './services/book.service';
import { GlobalDataContextService } from '../shared/services/global-data-context.service';

@NgModule({
  declarations: [BookCategoriesComponent, BookCategoryComponent, EditionsComponent, EditionComponent, BooksComponent, BookComponent, LayoutComponent],
  imports: [CommonModule, BookRoutingModule, SharedModule, MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule, NgSelectModule],
  providers: [BookCategoryService, EditionService, BookService],
})
export class BookModule {}
