import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  darkMode = signal<boolean>(
    this.manageDarkMode()
    // JSON.parse(window.localStorage.getItem('darkMode') ?? 'true')
  )
  setDarkMode = signal<string>('system')

  constructor() {

    effect(() => {
      // window.localStorage.setItem('darkMode', this.darkMode()+'')
      console.log(window.matchMedia('(prefers-color-scheme: dark)').matches)
    })
  }

  manageDarkMode(): boolean{
    const darkKey = window.localStorage.getItem('darkMode')
    console.log(darkKey)
    if(!darkKey){
      console.log('vacio')
      console.log(darkKey)
      window.localStorage.setItem('darkMode', 'system')
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }else{
      if(darkKey === 'enable' ) return true
      else if (darkKey === 'disable') return false
      else return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }
}
