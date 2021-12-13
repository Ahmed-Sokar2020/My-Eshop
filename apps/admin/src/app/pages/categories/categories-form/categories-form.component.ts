import { Category } from '@sokar/products';
import { CategoriesService } from '@sokar/products';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MessageService} from 'primeng/api';
import { Location } from '@angular/common';
import { Subject, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  curruntCategoryId?: string;
  endSubs: Subject<any> = new Subject;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
    ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    });
   }


  ngOnInit(): void {
    this.checkEditMode();
  }


  ngOnDestroy() {
    this.endSubs.next();
    this.endSubs.complete();
  }


  get categoryForm() {
    return this.form.controls;
  }


  onSubmit() {
    this.isSubmitted = true;
    if(this.form.invalid) return;

    const category: Category = {
      id: this.curruntCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value
    }

    if (this.editMode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }

  }


  cancel() {
    this.location.back();
  }


  // To Check if We Are in Edit Mode(/form/id)
  private checkEditMode() {
    this.route.params
    .pipe(takeUntil(this.endSubs))
    .subscribe(params => {
      if(params.id) {
        this.editMode = true;
        this.curruntCategoryId = params.id;
        this.categoriesService.getCategory(params.id)
        .pipe(takeUntil(this.endSubs))
        .subscribe(category => {
          this.categoryForm.name.setValue(category.name);
          this.categoryForm.icon.setValue(category.icon);
          this.categoryForm.color.setValue(category.color);

        })
      }
    })
  }


// To Create(Add) Category
  private _addCategory(category: Category) {
    // To make subscribe on Post Method
    this.categoriesService.CreateCategory(category)
    .pipe(takeUntil(this.endSubs))
    .subscribe(
      (category: Category) => {
      this.messageService.add({
        severity:'success',
        summary:'Success',
        detail:`Category ${category.name} is created`});
      timer(2000).toPromise().then(() => {
        this.location.back(); // To goback to the Categories List Page
      })
      },
      () => {
        this.messageService.add({
          severity:'error',
          summary:'Erorr',
          detail:'Category is not created'});
      });

  }


  // To Update(Edit) Category
  private _updateCategory(category: Category) {
    // To make subscribe on PUT Method
    this.categoriesService.updateCategory(category)
    .pipe(takeUntil(this.endSubs))
    .subscribe(
      (category: Category) => {
      this.messageService.add({
        severity:'success',
        summary:'Success',
        detail:`Category ${category.name} is Updated`});
      timer(2000).toPromise().then(() => {
        this.location.back(); // To goback to the Categories List Page
      })
      },
      () => {
        this.messageService.add({severity:'error', summary:'Erorr', detail:'Category is not Updated'});
      });

  }

}
