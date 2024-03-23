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
    if(!darkKey){
      window.localStorage.setItem('darkMode', 'system')
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }else{
      if(darkKey === 'enable' ) return true
      else if (darkKey === 'disable') return false
      else return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }

  setTheme(mode: 'light' | 'dark' | 'system'){
    switch (mode) {
      case 'light':
        this.darkMode.set(false)
        window.localStorage.setItem('darkMode', 'disable')
        break;
      case 'dark':
        this.darkMode.set(true)
        window.localStorage.setItem('darkMode', 'enable')
        break;
      case 'system':
        this.darkMode.set(window.matchMedia('(prefers-color-scheme: dark)').matches)
        window.localStorage.setItem('darkMode', 'system')
        break
      default:
        break;
    }
  }

  getCurrentTheme() {
    const theme = window.localStorage.getItem('darkMode')
    switch (theme) {
      case 'disable':
        return 'light'
      case 'enable':

        return 'dark';
      case 'system':
        return 'system'
      default:
        return 'system';
    }
  }
}
