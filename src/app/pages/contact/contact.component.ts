import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HomeService } from 'src/app/services/home.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private homeService: HomeService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }


  contact(){
    this.homeService.contact(this.contactForm.value).subscribe((res:any) => {
      this.messageService.add({ severity: 'success', summary: 'Merci', detail: res?.message });
      this.contactForm.reset();
    },
    (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Problème!', detail: err?.error?.message });
    });
  }

}
