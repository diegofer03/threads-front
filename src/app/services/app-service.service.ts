import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  darkMode = signal<boolean>(
    true
  )

  constructor() {
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode))
      console.log(this.darkMode())
    })
  }

}
