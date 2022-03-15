import { Component, OnInit } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDragStart, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { MainViewService } from './main-view.service';
import { AwesomeTooltipComponent } from 'src/app/awesome-tooltip.directive.spec';


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
  entryComponents: [AwesomeTooltipComponent]
})
export class MainViewComponent implements OnInit {
  public board;
  public data:any[] = [];
  constructor(service: MainViewService) {
    this.board = service.getBoard();
    // console.log(this.board.columns[0]);
    for (let i = 0; i < this.board.columns.length; i++) {
      let name = this.board.columns[i].name;
      let tasks = this.board.columns[i].tasks;
      if (localStorage.getItem('isset') == '0'){
        localStorage.setItem(name, JSON.stringify({name : name, tasks : tasks})); 
      }
      this.data.push(JSON.parse(localStorage.getItem(name)|| '{}'));
    }
    // console.log('data : ', this.data[1].name);
    // console.log('board : ', this.board.columns[1].name);
    
    
   }
  
  // board:Board  = new Board('Test', [
  //   new Column('Ideas', [
  //     "Some random idea",
  //     "This is another random idea",
  //     "Build an awesome apps"
  //   ]),
  //   new Column('Research', [
  //     "lorem",
  //     "ipsum",
  //     "this is a research"
  //   ]),
  //   new Column('Todo', [
  //     'Get to work',
  //     'Pick up groceries',
  //     'Go home',
  //     'Fall asleep'
  //   ]),
  //   new Column('Done', [
  //     'Get up',
  //     'Brush teeth',
  //     'Take a shower',
  //     'Check e-mail',
  //     'Walk dog'
  //   ])
  // ]);

  
  // console.log('hellow');
  // localstorage.setItem('board', 'board');
  

  ngOnInit(): void {
  }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>, name: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log("ini if");
      let binData = localStorage.getItem('bin');
      let boardData = JSON.parse(localStorage.getItem(name) || '{}'); // array of object
      let boardArray = boardData.tasks;
      console.log(boardArray);
      
      boardArray.push(binData);
      localStorage.setItem(name, JSON.stringify({ name: name, tasks: boardArray }));
      // console.log(event);
      
      
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      // console.log(column);
      
      
      localStorage.setItem(name, JSON.stringify({ name: name, tasks: event.container.data })); 
      localStorage.setItem('isset','1'); 
      
    }
  }

  onDragOver(event: CdkDragStart, column:any, item:any) {
    // console.log(item);
    // let array = ['lorem','ipsum', 'this is a research'];
    // array = column.tasks;
    
    // kondisi
    // let getItem = JSON.parse(localStorage.getItem(column.name) || '{}');    
      
    // buat array baru
      let array = [];
      for (let i = 0; i < column.tasks.length; i++) {
        array.push(column.tasks[i]);
        
      }
      // hapus array
      let index = array.indexOf(item);
      if (index !== -1) {
        array.splice(index, 1);
      }

      // console.log(array);
      // console.log(event.source.dropContainer.data);
      // console.log(event.source.dropContainer.data);
      
      localStorage.setItem(column.name, JSON.stringify({ name: column.name, tasks: array}));
      let binData:any = [];
      binData.push(item);
      localStorage.setItem('bin', binData);

  }

  onShowInsert(name:any){
    let container = document.getElementById('container'+name);
    container!.style.display = 'block'; 
    
  }
  onCloseInsert(name:string){
    let container = document.getElementById('container' + name);
    container!.style.display = 'none'; 
  }
  insertTask(event: KeyboardEvent, name:string){
    if (event.code==='Enter') {
      let task = (<HTMLInputElement>document.getElementById('task'+ name))!.value;
      console.log(task);

      let boardData = JSON.parse(localStorage.getItem(name) || '{}'); // array of object
      let boardArray = boardData.tasks;
      boardArray.push(task);
      localStorage.setItem(name, JSON.stringify({ name: name, tasks: boardArray }));
      localStorage.setItem('isset','1');
      location.reload();
      // console.log(event);
      
    }

  }


}


