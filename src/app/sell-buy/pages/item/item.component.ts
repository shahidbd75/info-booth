import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { Observable } from 'rxjs';
import { SubCategoryService } from '../../services/sub-category.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit{
  categories$: Observable<OptionsModel[]> | undefined;
  subCategories$: Observable<OptionsModel[]> | undefined;
  constructor(private categoryService: CategoryService, private subCategoryService: SubCategoryService) {
    
  }
  ngOnInit(): void {
    this.loadCategories();
  }

  onCategoryChange(id: string) {
    this.subCategories$ = this.subCategoryService.getByCategoryId(id);
  }

  loadCategories() {
    this.categories$ = this.categoryService.getCategories();
  }

}
