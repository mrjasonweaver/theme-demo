import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  animations: [
    trigger('routerAnimation', [
      transition('* <=> *', [
        // Initial state of new route
        query(':enter',
          style({
            opacity: 0,
            width: '100%',
            position: 'absolute',        
            transform: 'translate(0, 10%)'
          }),
          {optional:true}),

        // move page off screen up on leave
        query(':leave',
          animate('500ms ease',
            style({
              opacity: 0,
              width: '100%',
              position: 'absolute',
              transform: 'translate(0, -10%)'
            })
          ),
        {optional:true}),

        // move page in screen from bottom to top
        query(':enter',
          animate('500ms ease',
            style({
              opacity: 1,
              width: '100%',
              transform: 'translate(0, 0%)'
            })
          ),
        {optional:true}),
      ])
    ])
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // change the animation state
  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation
  }
}
