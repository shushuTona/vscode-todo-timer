'use strict';

import * as vscode from 'vscode';
import { TodoProvider } from './TodoProvider.class';
import { ToDoList } from './ToDoList.class';

export function activate( context: vscode.ExtensionContext ) {
    vscode.window.showInformationMessage( `Successfully called ToDoList.` );

    const todoProvider = new TodoProvider();
    vscode.window.registerTreeDataProvider('todoList', todoProvider);

    const toDoList = new ToDoList( todoProvider );

    const commandArray = [
        {
            commandId: 'todoList.refreshList',
            commandCallback: () => {
                toDoList.refreshList();
            }
        },
        {
            commandId: 'todoList.addToDoItem',
            commandCallback: () => {
                toDoList.addToDoItem();
            }
        },
        {
            commandId: 'todoList.editToDoItem',
            commandCallback: () => {
                toDoList.editToDoItem();
            }
        },
        {
            commandId: 'todoList.deleteToDoItem',
            commandCallback: () => {
                toDoList.deleteToDoItem();
            }
        }
    ];

    for ( let item of commandArray ) {
        context.subscriptions.push(vscode.commands.registerCommand( item.commandId, item.commandCallback ) );
    }
}

export function deactivate() {
}