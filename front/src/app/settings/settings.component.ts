import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services';
import { DomSanitizer,  SafeHtml,  SafeUrl,  SafeStyle} from '@angular/platform-browser';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  loading = false;
  submitted = false;

  @Input() lastname: string;
  @Input() firstname: string;
  @Input() username: string;
  @Input() mail: string;
  @Input() language: string;
  @Input() avatar: SafeUrl;

  constructor(private formBuilder: FormBuilder,
              private userService : UserService,
              private sanitization:DomSanitizer){}

  ngOnInit() {
    console.log("localStorage = ",localStorage);
    var user = JSON.parse(localStorage.getItem("currentUser"));
    console.log("urentuser json .id= ",  user.id);
    this.username = user.username;
    this.userService.getUser(user.id)
    .subscribe(
    data => 
    {
        console.log("get user OK = ", data);
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.mail = data.email;
        this.language = data.language;
        this.avatar = this.sanitization.bypassSecurityTrustUrl(data.picture);
    },
    error => {
        console.log("get user error = ", error);
    });
  }

}
