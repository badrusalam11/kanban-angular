import { Board } from "src/app/models/board.model";
import { Column } from "src/app/models/column.model";

export class UserBoardData
{
    
    databaseBoard(){
        //ceritanya database
        let board1: Board = new Board(1, 'My Board', [
            new Column(1, 'Ideas', [
                "Some random idea",
                "This is another random idea",
                "Build an awesome apps"
            ]),
            new Column(2, 'Research', [
                "lorem",
                "ipsum",
                "this is a research"
            ]),
            new Column(3, 'Todo', [
                'Get to work',
                'Pick up groceries',
                'Go home',
                'Fall asleep'
            ]),
            new Column(4, 'Done', [
                'Get up',
                'Brush teeth',
                'Take a shower',
                'Check e-mail',
                'Walk dog'
            ])
        ]);

        let board2: Board = new Board(2, 'Board Badru', [
            new Column(1, 'new', [
                "satu",
                "dua",
                "tiga"
            ]),
        ]);

        let array = [board1, board2];
        return array

    }
}