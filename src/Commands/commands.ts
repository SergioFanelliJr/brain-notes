//VS Code API
import * as vscode from 'vscode';

// Node imports
import * as path from 'path';

// Brain imports
import { BrainProvider } from "../BrainProvider/BrainProvider";
import { createFile, createFolder, deleteFile, deleteFolder } from '../Tools/tools';
import Brain from '../BrainProvider/Brain';
import Memory from '../BrainProvider/Memory';


function addNewBrain(brainProvider:BrainProvider){
    vscode.commands.registerCommand("brain-notes.addNewBrain", async () => {
        const brainName = await vscode.window.showInputBox({
            prompt: "Enter the name of the new brain",
            placeHolder: "New Brain"
        });
        if (brainName){
            const newBrainPath = path.join(brainProvider.brainPath, brainName);
            await createFolder(newBrainPath);
            brainProvider.refresh();
        }
    });
            
}

function addNewMemory(brainProvider:BrainProvider){
    vscode.commands.registerCommand("brain-notes.addNewMemory", async (node:Brain) => {
        const newMemoryName = await vscode.window.showInputBox({
            prompt: "Enter the name of the new memory",
            placeHolder: "New Memory"
        });
        if (newMemoryName){
            const newMemoryUri = await createFile(node.resourceUri, newMemoryName);
            vscode.window.showTextDocument(newMemoryUri);
            brainProvider.refresh();
        } else {
            vscode.window.showErrorMessage("No memory name provided");
        }
    });
}
        

function deleteBrain(brainProvider:BrainProvider){
    vscode.commands.registerCommand("brain-notes.deleteBrain", async (node:Brain) => {
        vscode.window.showInformationMessage(`Are you sure you want to delete ${node.label}?`, "Yes", "No").then(async (answer) => {
            if (answer === "Yes"){
                await deleteFolder(node.resourceUri);
                brainProvider.refresh();
            } else {
                vscode.window.showInformationMessage("Deletion canceled");
            }
        });
    });
}

function deleteMemory(brainProvider:BrainProvider){
    vscode.commands.registerCommand('brain-Notes.deleteMemory', async (node:Memory) => {
        vscode.window.showInformationMessage(`Are you sure you want to delete ${node.label}?`, "Yes", "No").then(async (answer) => {
            if (answer === "Yes"){
                await deleteFile(node.resourceUri);
                brainProvider.refresh();
            } else {
                vscode.window.showInformationMessage("Deletion canceled");
            }
        });
    });
}

//function to open a memory
function openMemory(brainProvider:BrainProvider){
    vscode.commands.registerCommand("brain-Notes.openMemory", (node:Memory) => {
        vscode.window.showTextDocument(node.resourceUri);
    });
}


export default async function registerBrainCommands(brainProvider:BrainProvider){
    addNewBrain(brainProvider);
    addNewMemory(brainProvider);
    deleteBrain(brainProvider);
    deleteMemory(brainProvider);
    openMemory(brainProvider);
};