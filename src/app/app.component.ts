import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public projects: any[] = []

    constructor () {
        this.getProjects()
    }

    getProjects (): void {
      setTimeout( () => {
        const result = localStorage.getItem('projects')
        this.projects = JSON.parse( result )
      }, 500)
    }

  
}