'use strict';

import * as vscode from 'vscode';
import * as path from 'path';

class NodeDependenciesProvider implements vscode.TreeDataProvider<Dependency> {
    private _onDidChangeTreeData: vscode.EventEmitter<Dependency | undefined | null | void> = new vscode.EventEmitter<Dependency | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<Dependency | undefined | null | void> = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem( element: Dependency ): vscode.TreeItem {
        return element;
    }

    getChildren( element?: Dependency ): Thenable<Dependency[]> {
        if ( element ) {
            return Promise.resolve([]);
        } else {
            return Promise.resolve(
                this.getDepsInPackageJson()
            );
        }
    }

    private getDepsInPackageJson(): Dependency[] {
        const arry = [
            {
                label: 'hoge',
                time: '30'
            },
            {
                label: 'piyo',
                time: '15'
            },
            {
                label: 'fuga',
                time: '20'
            },
        ];
        const returnArry = [];

        for ( let item of arry) {
            const instance = new Dependency(
                item.label,
                item.time,
                vscode.TreeItemCollapsibleState.None
            );

            returnArry.push( instance );
        }

        return returnArry;
    }
}

class Dependency extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        private version: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super( label, collapsibleState );
        this.tooltip = `${this.label}-${this.version}`;
        this.description = this.version;
    }

    iconPath = {
        light: path.join( __filename, '..', '..', 'out', 'img', 'active-icon.svg' ),
        dark: path.join( __filename, '..', '..', 'out', 'img', 'active-icon.svg' )
    };

    contextValue = 'dependency';
}

export function activate( context: vscode.ExtensionContext ) {
    vscode.window.showInformationMessage( `Successfully activate.` );

    const nodeDependenciesProvider = new NodeDependenciesProvider();
    vscode.window.registerTreeDataProvider('todoList', nodeDependenciesProvider);
    vscode.commands.registerCommand( 'todoList.refreshEntry', () => {
        nodeDependenciesProvider.refresh();
    });
    vscode.commands.registerCommand( 'todoList.editEntry', () => {
        vscode.window.showInformationMessage( `Successfully called editEntry.` );
    });
    vscode.commands.registerCommand( 'todoList.deleteEntry', () => {
        vscode.window.showInformationMessage( `Successfully called deleteEntry.` );
    } );

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