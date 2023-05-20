
// VSCode imports
import * as vscode from 'vscode';
import { Event, EventEmitter } from 'vscode';

//Node imports
import * as fs from 'fs';
import * as path from 'path';

// Brain imports
import Brain from './Brain';
import Memory from './Memory';

// Tools imports
import { getFolderPath, getFolderUri, scanFolder } from '../Tools/tools';


export class BrainProvider implements vscode.TreeDataProvider<Brain | Memory> {
    
    readonly brainPath = getFolderPath();
    private brainUri: vscode.Uri = getFolderUri(this.brainPath);
    
    constructor() {}
    
    private _onDidChangeTreeData:
        EventEmitter<Brain | Memory | (Brain | Memory)[] | null | undefined> =
            new EventEmitter<Brain | Memory | (Brain | Memory)[] | null | undefined>();
    
    readonly onDidChangeTreeData?:
        vscode.Event<void | Brain | Memory | (Brain | Memory)[] | null | undefined> | undefined;
    
    /** Refresh on DidChange */
    refresh(): void {
        this._onDidChangeTreeData.fire(undefined);
    }
    
    /** Register the treeView */
    register(): void {

        vscode.window.registerTreeDataProvider("brain-notes", this);
        vscode.commands.registerCommand("brain-notes.refresh", () => this.refresh());
    }
    
    
    getTreeItem(element: Brain | Memory): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: Brain | Memory | undefined): vscode.ProviderResult<(Brain | Memory)[]> {
        if (element === undefined) {
            return this.getBrain();
        }
        return this.getMemorys(element);
    }

    // getBrains(): Thenable<Brain[]> 
    // if no element, scan the folder
    // scanfolder is async and return an array of Uris
    // check if the Uri is a folder
    // if it is, create a new Brain with the Uri
    // if its a file, return a memory
    // return an array of brains and memories
    
    getBrain(): Thenable<(Brain | Memory)[]> {
        return scanFolder(this.brainUri).then((uris) => {
            return uris.map((uri) => {
                if (fs.statSync(uri.fsPath).isDirectory()) {
                    return new Brain(uri);
                } else {
                    return new Memory(uri);
                }
            });
        });
    }

    getMemorys(element: Brain | Memory): Thenable<(Brain | Memory)[]> {
        return scanFolder(element.resourceUri).then((uris) => {
            return uris.map((uri) => {
                if (fs.statSync(uri.fsPath).isDirectory()) {
                    return new Brain(uri);
                }
                return new Memory(uri);
            });
        });
    }
    
}
    