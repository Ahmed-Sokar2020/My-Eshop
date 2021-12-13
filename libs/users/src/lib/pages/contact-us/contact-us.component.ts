import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'users-contact-us',
  templateUrl: './contact-us.component.html',
  styles: [
  ]
})
export class ContactUsComponent implements OnInit {

  contactFormGroup: FormGroup;
  isSubmitted = false;
  constructor(
    private fb: FormBuilder,
    ) {
    this.contactFormGroup = this.fb.group({
      name: ['', [Validators.required]] ,
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    })
  }


  ngOnInit(): void {
  }


  get contactForm() {
    return this.contactFormGroup.controls;
  }


  onSubmit() {
    this.isSubmitted = true;

    if(this.contactForm.invalid) return;
  }

}
