import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { BookCategoriesComponent } from './pages/book-categories/book-categories.component';
import { BookCategoryComponent } from './pages/book-category/book-category.component';
import { EditionsComponent } from './pages/editions/editions.component';
import { EditionComponent } from './pages/edition/edition.component';
import { BooksComponent } from './pages/books/books.component';
import { BookComponent } from './pages/book/book.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: 'book-categories', component: BookCategoriesComponent },
    { path: 'book-category/:id', component: BookCategoryComponent },
    { path: 'book-category', component: BookCategoryComponent },
    { path: 'editions', component: EditionsComponent },
    { path: 'edition/:id', component: EditionComponent },
    { path: 'edition', component: EditionComponent },
    { path: 'books', component: BooksComponent },
    { path: 'book/:id', component: BookComponent },
    { path: 'book', component: BookComponent },
    { path: '', redirectTo: 'books', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
