import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav'
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../../../core/auth.service";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, RouterLink, RouterLinkActive, MatMenu, MatButton, MatMenuTrigger, MatMenuItem, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(private readonly authService: AuthService) {
  }

  logout() {
    this.authService.logout();
  }

}
