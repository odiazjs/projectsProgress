import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

import { projects } from './projectsData'

import { AppComponent } from './app/app.component'
import { ProgressBarComponent } from './progressBar/progressBar.component'

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { 
  constructor() {
    localStorage.setItem('projects', JSON.stringify( projects ))
  }
 }