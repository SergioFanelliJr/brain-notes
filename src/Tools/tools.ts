//Vscode
import * as vscode from "vscode";

// Node
import * as path from "path";
import * as os from "os";
import * as fsNode from "fs";


/** @returns a path string of brainNotes folder */
export function getFolderPath(): string{
    const folderPath = path.join(os.homedir(), "brainNotes");
    return folderPath;
    
}


/** Check if a path exists
 * 
 * @param path String - Path to check
 * 
 * @returns boolean
*/ 
export function pathExists(path: string): boolean {
    try {
        fsNode.accessSync(path);
    } catch (err) {
        return false;
    }
    return true;
}

/** Create a folder at a path
 * 
 * @param path String - Path to create folder at
 * 
 * @returns vscode.Uri
 * 
 * If the path exists, return the Uri of the path
 * If the path does not exist, create the folder and return the Uri
 */
export function createFolder(path: string): vscode.Uri {
    if (pathExists(path)) {
        return vscode.Uri.file(path);
    } else {
        vscode.workspace.fs.createDirectory(vscode.Uri.file(path));
        return vscode.Uri.file(path);
    }
}

/** Get a folder Uri
 * 
 * @param path String - Path to get Uri of
 * 
 * @returns vscode.Uri
 * 
 * If the path exists, return the Uri of the path
 * If the path does not exist, create the folder and return the Uri
 */
export function getFolderUri(path:string): vscode.Uri {
    if (pathExists(path)) {
        return vscode.Uri.file(path);
    } else {
        return createFolder(path);
    }
}

/** Create a file from a folder Uri
 * 
 * @param folderUri vscode.Uri - Uri of folder to create file in
 * @param fileName String - Name of file to create
 * 
 * @returns vscode.Uri
 * 
 * If the file exists, return the Uri of the file
 * If the file does not exist, create the file and return the Uri
 */
export function createFile(folderUri: vscode.Uri, fileName: string): vscode.Uri {
    let filePath = path.join(folderUri.fsPath, fileName);
    if ( pathExists(filePath)) {
        return vscode.Uri.file(filePath);
    } else {
        vscode.workspace.fs.writeFile(vscode.Uri.file(filePath), new Uint8Array);
        return vscode.Uri.file(filePath);
    }
}

/** Get a file Uri
 * 
 * @param folderUri vscode.Uri - Uri of folder to create file in
 * @param fileName String - Name of file to get Uri of
 * 
 * @returns vscode.Uri
 * 
 * If the file exists, return the Uri of the file
 * If the file does not exist, create the file and return the Uri
 */
export function getFileUri(folderUri: vscode.Uri, fileName: string): vscode.Uri {
    let filePath = path.join(folderUri.fsPath, fileName);
    if (pathExists(filePath)) {
        return vscode.Uri.file(filePath);
    } else {
        return createFile(folderUri, fileName);
    }
}


/** Delete a folder
 * 
 * @param folderUri vscode.Uri - Uri of folder to delete
 * 
 * @returns void
 * 
 */
export function deleteFolder(folderUri: vscode.Uri): void {
    vscode.workspace.fs.delete(folderUri, {recursive: true});
}

/** Delete a file
 * 
 * @param fileUri vscode.Uri - Uri of file to delete
 * 
 * @returns void
 * 
 */
export function deleteFile(fileUri: vscode.Uri): void {
    vscode.workspace.fs.delete(fileUri);
}

/** Rename a folder
 * 
 * @param folderUri vscode.Uri - Uri of folder to rename
 * @param newName String - New name of folder
 * 
 * @returns void
 */
export function renameFolder(folderUri: vscode.Uri, newName: string): void {
    const newUri = vscode.Uri.file(path.join(folderUri.fsPath, newName));
    vscode.workspace.fs.rename(folderUri, newUri);
}

/** Rename a file
 * 
 * @param fileUri vscode.Uri - Uri of file to rename
 * @param newName String - New name of file
 * 
 * @returns void
 */
export function renameFile(fileUri: vscode.Uri, newName: string): void {
    const newUri = vscode.Uri.file(path.join(fileUri.fsPath, newName));
    vscode.workspace.fs.rename(fileUri, newUri);
}

/** Open a file
 * 
 * @param fileUri vscode.Uri - Uri of file to open
 * 
 * @returns void
 * 
 */
export function openFile(fileUri: vscode.Uri): void {
    vscode.window.showTextDocument(fileUri);
}

/** Scan a folder and return an array of Uris
 * 
 * @param folderUri vscode.Uri - Uri of folder to scan
 * 
 * @returns vscode.Uri[]
 * 
 */
export async function scanFolder(folderUri: vscode.Uri): Promise<vscode.Uri[]> {
    const files = await vscode.workspace.fs.readDirectory(folderUri);
    const uris: vscode.Uri[] = [];
    files.forEach(file => {
        uris.push(vscode.Uri.file(path.join(folderUri.fsPath, file[0])));
    });
    return uris;
}

