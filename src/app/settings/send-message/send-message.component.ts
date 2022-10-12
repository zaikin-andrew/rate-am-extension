import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BrowserService } from '../../shared/services/browser.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss'],
})
export class SendMessageComponent implements OnInit {

  public contactForm: FormGroup;

  constructor(private browser: BrowserService) {
    this.contactForm = new FormGroup({
      message: new FormControl(null, [Validators.required]),
    });
  }


  ngOnInit(): void {
  }

  async onSubmit() {
    this.browser.openMailClient(this.contactForm.controls['message'].value);

  }
}



