import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: [
  ]
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  endSubs$: Subject<any> = new Subject

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories()
    .pipe(takeUntil(this.endSubs$))
    .subscribe((categories) => {
      this.categories = categories;
    })
  }


  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
