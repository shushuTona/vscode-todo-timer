import * as vscode from 'vscode';
import TodoItem from './TodoItem.class';

class TodoProvider implements vscode.TreeDataProvider<TodoItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<TodoItem | undefined | null | void> = new vscode.EventEmitter<TodoItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<TodoItem | undefined | null | void> = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem( element: TodoItem ): vscode.TreeItem {
        return element;
    }

    getChildren( element?: TodoItem ): Thenable<TodoItem[]> {
        if ( element ) {
            return Promise.resolve( [] );
        } else {
            return Promise.resolve(
                this.getToDoListJson()
            );
        }
    }

    private getToDoListJson(): TodoItem[] {
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

        for ( let item of arry ) {
            const instance = new TodoItem(
                item.label,
                item.time,
                vscode.TreeItemCollapsibleState.None
            );

            returnArry.push( instance );
        }

        return returnArry;
    }
}

export default TodoProvider;
