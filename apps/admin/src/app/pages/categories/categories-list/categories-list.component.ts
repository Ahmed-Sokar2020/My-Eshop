import { CategoriesService, Category } from '@sokar/products';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endSubs: Subject<any> = new Subject;
  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    ) { }


  ngOnInit(): void {
    this._getCategories();
  }


  ngOnDestroy() {
    this.endSubs.next();
    this.endSubs.complete();
  }


  // To subscribe on the list of Categories
  private _getCategories() {
    this.categoriesService.getCategories()
    .pipe(takeUntil(this.endSubs))
    .subscribe((categories: any) => {
        this.categories = categories;
    });
  }


  // To subscribe on the deleted Categories
  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId)
        .pipe(takeUntil(this.endSubs))
        .subscribe(
          () => {
            // vvv-- To delete Category after success case immediatly not later
            this._getCategories();
            this.messageService.add({severity:'success',summary:'Success',
            detail:`Category is deleted`})}
          ,
          () => {
            this.messageService.add({severity:'error', summary:'Erorr', detail:'Category is not deleted'});
          }
        )

      }
  });

  }


  editCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }

}



