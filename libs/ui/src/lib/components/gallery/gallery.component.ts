import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [
  ]
})
export class GalleryComponent implements OnInit {

  selectedImageUrl?: string;
  @Input() images: string[] | any ;

  constructor() { }


  ngOnInit(): void {
    // To select the First Image of the Array of Images to be the Main Image
    if(this.hasImages) {
      this.selectedImageUrl = this.images[0]
    }
  }


  // To Change the Images in the Gallary
  changeSelectedImage(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
  }


  // Check if the Component has Images or Not
  get hasImages() {
    return this.images?.length > 0;
  }

}
