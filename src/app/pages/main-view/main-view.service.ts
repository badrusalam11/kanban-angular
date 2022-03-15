import { Board } from "src/app/models/board.model";
import { Column } from "src/app/models/column.model";

export class MainViewService {
    getBoard() {
        let board: Board = new Board('Test', [
            new Column('Ideas', [
                "Some random idea",
                "This is another random idea",
                "Build an awesome apps"
            ]),
            new Column('Research', [
                "lorem",
                "ipsum",
                "this is a research"
            ]),
            new Column('Todo', [
                'Get to work',
                'Pick up groceries',
                'Go home',
                'Fall asleep'
            ]),
            new Column('Done', [
                'Get up',
                'Brush teeth',
                'Take a shower',
                'Check e-mail',
                'Walk dog'
            ])
        ]);
        
        return board;
    }
}
