import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RouterPathNames } from 'src/app/enum/router-path-names';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private toastr: ToastrService,  private router: Router,) {}

  goToCart(){
    this.router.navigate([`/${RouterPathNames.checkout}`]);
  }
}
