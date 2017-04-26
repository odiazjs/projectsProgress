import { Component, Input, AfterViewInit, ApplicationRef } from '@angular/core'

@Component({
  selector: 'progress-bar',
  templateUrl: './progressBar.template.html',
  styleUrls: ['./progressBar.css']
})
export class ProgressBarComponent implements AfterViewInit {

    @Input() project: Project

    constructor ( private changeDet: ApplicationRef ) {
        
    }

    ngAfterViewInit () {
        this.setProgress()
    }

    setProgress () : void {

        const total                 = this.project.tasks.length
        const completed             = this.project.tasks.filter( ( task: Task ) => { return task.FIELD9 === 'Done' } ).length
        const percentageCompleted   = Math.floor(completed * 100 / total)
        this.project.completed      = percentageCompleted

        let el = document.getElementById(this.project.name)

        let width = 1
        const frame = () => {
            if (width >= percentageCompleted) {
                clearInterval(id);
            } else {
                width++; 
                el.style.width = width + '%'; 
            }
        }
        let id = setInterval(frame, 25)

    }

  
}

export interface Project {
    name: string, 
    tasks: Task[],
    completed: number
}

export interface Task {
    FIELD2: string, //id
    FIELD4: string, //name
    FIELD9: string //status
}