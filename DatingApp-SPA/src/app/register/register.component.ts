import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('Registration Successful');
    }, err => {

      if (err.error.errors){
        let errs = '';
        if (err.error.errors.Username !== undefined) {
          errs = err.error.errors.Username[0] + '\n';
        }

        if (err.error.errors.Password !== undefined) {
          errs += err.error.errors.Password[0];
        }

        this.alertify.error(errs);
      }
      else
      {
        this.alertify.error(err.error);
      }

    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('Cancelled');
  }

}
