import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {IUrl} from "../../models/models";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() listUrls!: IUrl[];
  @Input() loginRedirect!: string;
  @Input() logoutRedirect!: string;
  user: any;

  constructor(
    private router: Router,
    private sharedService: SharedService
    ) {
  }

  ngOnInit(): void {
    const userData = localStorage.getItem("currentUser");
    this.user = userData ? JSON.parse(userData) : null;
  }

  logout(): void {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    this.router.navigate([this.logoutRedirect]);
    this.user = localStorage.getItem("currentUser");
  }

  goToLogin(): void {
    this.router.navigate([this.loginRedirect]);
  }

  toggleSearch() {
    this.sharedService.emmitToggleSearch();
  }
}
