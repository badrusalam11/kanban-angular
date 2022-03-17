import { Component, HostListener, OnInit } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDragStart, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { MainViewService } from './main-view.service';
import { AwesomeTooltipComponent } from 'src/app/awesome-tooltip.directive.spec';
import Swal from 'sweetalert2';


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
      // check if data is empty or not
      if (task=="") {
        document.getElementById('error-task')!.style.display = 'block';
      }
      else{
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

  triggerEdit(){
    let deleteIcon = document.getElementsByClassName('delete-icon');
    let array = Array.from(deleteIcon as HTMLCollectionOf<HTMLElement>);
    for (let i = 0; i < array.length; i++) {
      if (array[i].style.display=='none') {
        array[i].style.display = 'block';      
      }
      else{
        array[i].style.display = 'none';      
        this.closeAllEdit();
      }
    }
  }


  closeAllEdit(){
    // console.log();
    let array = this.data;
    for (let i = 0; i < array.length; i++) {
      let tasks = this.data[i].tasks;
      let name = this.data[i].name;
      for (let j = 0; j < tasks.length; j++) {
        let task = tasks[j];
        let taskId = document.getElementsByClassName(name)[j].id;
        let taskValue = document.getElementById(taskId);
        let editId = document.getElementById('edit'+task);
        // console.log(task);
        
        // // let taskId = document.getElementById(task);
        if (editId) {
          if (taskId === task) {
            taskValue!.innerHTML = task;          
          }
          
        }
        
      }
      
    }
  }

  
showEditTask(event:MouseEvent ,item:any, column:any){
  //  console.log(event);
  // console.log(item);
  let id = document.getElementById(item);
  const value = id!.innerHTML;
  if (!this.isHTML(value)) {
    id!.innerHTML = `<input id="edit` + item + `" class="input is-normal" type="text" value="` + value +`" 
    onkeypress="editTask(event, '`+ item + `', '` + column.name +`')">`;
  }
  
}

isHTML(str:any) {
  var a = document.createElement('div');
  a.innerHTML = str;

  for (var c = a.childNodes, i = c.length; i--;) {
    if (c[i].nodeType == 1) return true;
  }

  return false;
}

deleteTask(item:any, column:any) {
  //confirmation

  Swal.fire({
    title: 'Are you sure want to delete this task?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
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
      localStorage.setItem(column.name, JSON.stringify({ name: column.name, tasks: array }));
      localStorage.setItem('isset', '1');
      document.getElementById('task' + item)!.style.display = 'none';
    }

  })

}
insertActivity(){
  let inputValue = (<HTMLInputElement>document.getElementById('new-activity')).value;
  //check if data is empty or not
  if (inputValue=="") {
    console.log("kosong");
    document.getElementById('error-activity')!.style.display = 'block';
  }
  else{
    console.log(inputValue);    
    const obj = { name: inputValue, tasks: ""};
    let jsonData = JSON.stringify(obj);
    // localStorage.setItem(name, JSON.stringify({ name: name, tasks: tasks })); 
    localStorage.setItem(inputValue, jsonData);
    localStorage.setItem('isset', '1');
    Swal.fire({
      icon: 'success',
      title: 'Activity has been saved',
      showConfirmButton: false,
      timer: 1000
    });
    setTimeout(function () {
      //your code to be executed after 1 second
      location.reload();
    }, 1000);
    // this.data.push(jsonData);
    console.log(this.data);
    
  }
}


  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.closeAllEdit();
  }

}

// document.addEventListener('keydown', function (event) {
//   if (event.key === "Escape") {
//     //do something
//     let closeAllEdit = new MainViewComponent(service: MainViewService);
//     closeAllEdit();

//   }
// });

