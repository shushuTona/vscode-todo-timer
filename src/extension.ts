'use strict';

import * as vscode from 'vscode';
import TodoProvider from './TodoProvider.class';

export function activate( context: vscode.ExtensionContext ) {
    vscode.window.showInformationMessage( `Successfully activate ToDo-Timer.` );

    const todoProvider = new TodoProvider();
    vscode.window.registerTreeDataProvider('todoList', todoProvider);

    // ステータスバーにカウント表示部分を追加
    const statusBarItemMain = vscode.window.createStatusBarItem( vscode.StatusBarAlignment.Left, 6 );
    statusBarItemMain.tooltip = 'To Do Timer Counter';
    statusBarItemMain.text = 'To Do Timer Counter';
    statusBarItemMain.show();

    let counterFinishFlag = true;
    let countNum = 0;
    let count: NodeJS.Timer;

    const counterInit = () => {
        if ( counterFinishFlag ) {
            countNum = 0;
            counterFinishFlag = false;
        }
    };

    const counterStop = () => {
        clearInterval( count );
    };

    const counterStart = () => {
        counterInit();

        count = setInterval( () => {
            statusBarItemMain.text = `${countNum}`;

            if ( countNum < 10 ) {
                countNum++;
            } else {
                counterStop();
                counterFinishFlag = true;
                statusBarItemMain.tooltip = 'To Do Timer Counter';
            }
        }, 1000 );
    };

    const addToDoItem = () => {
        vscode.window.showInputBox( { placeHolder: 'Create ToDo & Write count time.' } )
            .then( ( value ) => {
                console.log( value );
            } );
    };

    const commandArray = [
        {
            commandId: 'todoList.refreshEntry',
            commandCallback: () => {
                todoProvider.refresh();
            }
        },
        {
            commandId: 'todoList.editEntry',
            commandCallback: () => {
                vscode.window.showInformationMessage( `Successfully called editEntry.` );
            }
        },
        {
            commandId: 'todoList.deleteEntry',
            commandCallback: () => {
                vscode.window.showInformationMessage( `Successfully called deleteEntry.` );
            }
        },
        {
            commandId: 'todoList.countStart',
            commandCallback: () => {
                vscode.window.showInformationMessage( `Successfully called countStart.` );

                counterStart();
            }
        },
        {
            commandId: 'todoList.countStop',
            commandCallback: () => {
                vscode.window.showInformationMessage( `Successfully called countStop.` );

                counterStop();
            }
        },
        {
            commandId: 'todoList.addToDoItem',
            commandCallback: () => {
                vscode.window.showInformationMessage( `Successfully called addToDoItem.` );

                addToDoItem();
            }
        },
        {
            commandId: 'todoList.piyo',
            commandCallback: () => {
                vscode.window.showInformationMessage( `Successfully called piyo.` );
            }
        },
    ];

    for ( let item of commandArray ) {
        context.subscriptions.push( vscode.commands.registerCommand( item.commandId, item.commandCallback ) );
    }
}

export function deactivate() {
}