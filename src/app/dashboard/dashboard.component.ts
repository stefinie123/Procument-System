import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Add Order', cols: 1, rows: 1, content: 'Add Order' },
          { title: 'Card 2', cols: 1, rows: 1,  content: 'View Previous Orders' },
          { title: 'Card 3', cols: 1, rows: 1 , content: 'My Notifications'},
          { title: 'Card 4', cols: 1, rows: 1, content: 'Approved Orders' }
        ];
      }

      return [
        { title: 'Add Order', cols: 1, rows: 1, content: 'Add Order' },
        { title: 'Card 2', cols: 1, rows: 1 , content: 'View Previous Orders'},
        { title: 'Card 3', cols: 1, rows: 1 , content: 'My Notifications'},
        { title: 'Card 4', cols: 1, rows: 1 , content: 'Approved Orders'}
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
