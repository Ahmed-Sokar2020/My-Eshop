/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CategoriesService, Category, ProductsService } from '@sokar/products';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: []
})
export class ProductsFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  editMode = false;
  isSubmitted = false;
  imageDisplay: any | ArrayBuffer;
  categories: Category[] = [];
  curruntProductId = '';
  endSubs: Subject<any> = new Subject;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    ) {
    this.form = this.formBuilder.group({
      name: ['',[Validators.required]],
      brand: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      countInStock: ['', [Validators.required]],
      description: ['', [Validators.required]],
      richDescription: [''],
      image: ['', [Validators.required]],
      isFeatured: [false],
    })
  }


  ngOnInit(): void {
    this._getCategories();
    this.checkEditMode()
  }


  ngOnDestroy() {
    this.endSubs.next();
    this.endSubs.complete();
  }


  get productForm() {
    return this.form.controls
  }


  onSubmit() {
    this.isSubmitted = true;

    if(this.form.invalid) return;

    const formData = new FormData();
    Object.keys(this.productForm).map(key => {
      formData.append(key, this.productForm[key].value)
    })

    if(this.editMode) {
      this._updateProduct(formData);
    } else {
      this._addProduct(formData);
    }
  }


  cancel() {
    this.location.back();
  }


  // To Check if We Are in Edit Mode
  private checkEditMode() {
  this.route.params
  .pipe(takeUntil(this.endSubs))
  .subscribe(params => {
    if(params.id) {
      this.editMode = true;
      this.curruntProductId = params.id;
      this.productsService.getProduct(params.id).subscribe(product => {
        this.productForm.name.setValue(product.name);
        this.productForm.brand.setValue(product.brand);
        this.productForm.price.setValue(product.price);
        this.productForm.countInStock.setValue(product.countInStock);
        this.productForm.category.setValue(product.category?.id);
        this.productForm.description.setValue(product.description);
        this.productForm.richDescription.setValue(product.richDescription);
        this.productForm.isFeatured.setValue(product.isFeatured);
        this.imageDisplay = product.image;
        this.productForm.image.setValidators([]);
        this.productForm.image.updateValueAndValidity();

      })
    }
  })
}


  // To Create(Add) Product
  private _addProduct(formData: FormData) {
    // To make subscribe on Post Method
    this.productsService.createProduct(formData)
    .pipe(takeUntil(this.endSubs))
    .subscribe(
      () => {
      this.messageService.add({
        severity:'success',
        summary:'Success',
        detail:`Product is added`});
      timer(2000).toPromise().then(() => {
        this.location.back(); // To goback to the Products List Page
      })
      },
      () => {
        this.messageService.add({
          severity:'error',
          summary:'Erorr',
          detail:'Product is not added'});
      });

  }


  // To Update(Edit) Product
  private _updateProduct(formData: FormData) {
    // To make subscribe on PUT Method
    this.productsService.updateProduct(formData, this.curruntProductId)
    .pipe(takeUntil(this.endSubs))
    .subscribe(
      () => {
      this.messageService.add({severity:'success', summary:'Success', detail:`Product is Updated`});
      timer(2000).toPromise().then(() => {
        this.location.back(); // To goback to the Categories List Page
      })
      },
      () => {
        this.messageService.add({severity:'error', summary:'Erorr', detail:'Product is not Updated'});
      });

  }


  // Function for the Dropdown List in "Add Product Form"
  private _getCategories() {
    this.categoriesService.getCategories()
    .pipe(takeUntil(this.endSubs))
    .subscribe(categories => {
      this.categories = categories;
    })
  }


  onImageUpload(event: any) {
    const file = event.target.files[0];

    if(file) {
      this.form.patchValue({image: file});
      this.form.get('image')?.updateValueAndValidity();

      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      }
      fileReader.readAsDataURL(file);
    }
  }


}




