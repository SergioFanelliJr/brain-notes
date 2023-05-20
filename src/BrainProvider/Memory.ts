//VS Code API
import * as vscode from "vscode";


export default class Memory extends vscode.TreeItem {
    public readonly contextValue = "memory";
    public readonly collapsibleState: vscode.TreeItemCollapsibleState;
    public readonly resourceUri: vscode.Uri;

    iconPath = {
        light: "/home/SergioFanelliJr/projetos/VSCodeExtension/brain-notes/src/Resources/ideaLight.svg",
        dark:  "/home/SergioFanelliJr/projetos/VSCodeExtension/brain-notes/src/Resources/ideaDark.svg"
    };

    command = {
        command: "brain-Notes.openMemory",
        title: "Open Memory",
        arguments: [this]
    };

    constructor(
        resourceUri: vscode.Uri,
        collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.None,
    ) {
        super(resourceUri, collapsibleState);
        this.collapsibleState = collapsibleState;
        this.resourceUri = resourceUri;
    }
}