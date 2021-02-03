import * as vscode from 'vscode';
import { TodoProvider } from './TodoProvider.class';

class ToDoList {
    constructor(
        private todoProvider: TodoProvider
    ) {
        this.todoProvider = todoProvider;
    }

    public refreshList() {
        this.todoProvider.refresh();
    }

    public async addToDoItem() {
        const todoTitle = await vscode.window.showInputBox( { placeHolder: 'Write ToDo title.' } );
        const todoTimer = await vscode.window.showInputBox( { placeHolder: 'Write ToDo time. ( 10 ～ 60 )' } );
        const todoTimerNum = todoTimer ? parseFloat( todoTimer ) : 10;

        if (
            todoTimerNum >= 10 &&
            todoTimerNum <= 60
        ) {
            console.log( todoTitle, todoTimer );
        } else {
            vscode.window.showErrorMessage('Please set todo timer value between 10 and 60.');
        }
    }

    public editToDoItem() {
        vscode.window.showInformationMessage( `Successfully called editToDoItem.` );
    }

    public deleteToDoItem() {
        vscode.window.showInformationMessage( `Successfully called deleteToDoItem.` );
    }
}

export { ToDoList };