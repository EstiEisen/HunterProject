import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { UserSessionService } from '../shared/_services/user-session.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css'],
  providers: [UserSessionService]
})
export class SecureComponent implements OnInit {

  activeUrl: string;

  readonly menuLinks = [
    { url: 'dashboard', label: 'דף הבית' },
    { url: 'process', label: 'תהליכים', subMenuLinks: [
      { url: 'new', label: 'צור תהליך חדש' },
      { url: 'table', label: 'תהליכים' }
    ]},
    { url: 'feedback', label: 'היזונים חוזרים', subMenuLinks: [
      { url: 'graph', label: 'גרף' },
      { url: 'table/employees', label: 'טבלת עובדים'},
      { url: 'table/files', label: 'טבלת קבצים'}
    ]},
    { url: 'rejected', label: 'מעקב שגויים', subMenuLinks: [
      { url: 'employees', label: 'לפי עובד' },
      { url: 'files', label: 'לפי קובץ'},
    ]},
    { url: 'settings', label: 'הגדרות', subMenuLinks: [
      { url: 'employees', label: 'עובדים' },
      { url: 'employers', label: 'מעסיקים'},
      { url: 'agents', label: 'סוכנים'},
      { url: 'contacts', label: 'אנשי קשר'},
   
    ]},
  ];

  constructor(private router: Router, private userSession: UserSessionService) {}

  ngOnInit() {
    this.setActiveUrl(this.router.url);

    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.setActiveUrl(event.url);
      }
    });
  }

  private setActiveUrl(url: string): void {
    if (url.substr(1).indexOf('/') !== -1) {
      this.activeUrl = url.substr(1, url.substr(1).indexOf('/'));
    } else {
      this.activeUrl = url.substr(1);
    }
  }

  logout(): void {
    this.userSession.logout();
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
