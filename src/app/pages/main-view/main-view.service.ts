import { Board } from "src/app/models/board.model";
import { Column } from "src/app/models/column.model";
import jwt_decode from "jwt-decode";
import { UserBoardData } from "./user-board-data.service";

export class MainViewService {
    getBoard() {
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImJhZHJ1c2FsYW0xMSIsImV4cCI6MTY0NzU5MDUwNjM1NCwiYm9hcmQiOnsiaWQiOjEsIm5hbWUiOiJNeSBCb2FyZCJ9fQ.crEg6A3lupOlciglKcztLi4A7Jc3Qfp1JRpxhuCyfvw';
        let decode: any = jwt_decode(token);
        console.log(decode);

        // ceritanya database
        // let board: Board = new Board('Board Badru', [
        //     new Column(1, 'Ideas', [
        //         "Some random idea",
        //         "This is another random idea",
        //         "Build an awesome apps"
        //     ]),
        //     new Column(2, 'Research', [
        //         "lorem",
        //         "ipsum",
        //         "this is a research"
        //     ]),
        //     new Column(3, 'Todo', [
        //         'Get to work',
        //         'Pick up groceries',
        //         'Go home',
        //         'Fall asleep'
        //     ]),
        //     new Column(4, 'Done', [
        //         'Get up',
        //         'Brush teeth',
        //         'Take a shower',
        //         'Check e-mail',
        //         'Walk dog'
        //     ])
        // ]);

        let userBoard = new UserBoardData()
        let db = userBoard.databaseBoard();
        let board;
        // console.log(db[0].name);
        
        for (let i = 0; i < db.length; i++) {
            if (db[i].name == decode.board.name) {
                board = db[i];
            }            
        }
        
        sessionStorage.setItem('token', token);
    
        return board;
    }
}
