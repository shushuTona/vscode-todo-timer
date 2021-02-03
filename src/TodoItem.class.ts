import * as vscode from 'vscode';
import * as path from 'path';

class TodoItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        private time: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super( label, collapsibleState );
        this.tooltip = `${this.label} - ${this.time}`;
        this.description = this.time;
    }

    iconPath = {
        light: path.join( __filename, '..', '..', 'out', 'img', 'active-icon.svg' ),
        dark: path.join( __filename, '..', '..', 'out', 'img', 'active-icon.svg' )
    };

    contextValue = 'TodoItem';
}

export default TodoItem;
