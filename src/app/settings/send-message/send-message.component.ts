import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BrowserService } from '../../shared/services/browser.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss'],
})
export class SendMessageComponent implements OnInit {

  public contactForm: UntypedFormGroup;

  constructor(private browser: BrowserService) {
    this.contactForm = new UntypedFormGroup({
      message: new UntypedFormControl(null, [Validators.required]),
    });
  }


  ngOnInit(): void {
  }

  async onSubmit() {
    this.browser.openMailClient(this.contactForm.controls['message'].value);

  }
}



