//VSCode imports
import * as vscode from 'vscode';

export default class Brain extends vscode.TreeItem {
    public readonly contextValue = "brain";
    public readonly collapsibleState: vscode.TreeItemCollapsibleState;
    public readonly resourceUri: vscode.Uri;

    iconPath = {
        light: "/home/SergioFanelliJr/projetos/VSCodeExtension/brain-notes/src/Resources/brainDark.svg",
        dark: "/home/SergioFanelliJr/projetos/VSCodeExtension/brain-notes/src/Resources/brainDark.svg"
    };


    constructor(
        resourceUri: vscode.Uri,
        collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.Collapsed,
    ) {
        super(resourceUri, collapsibleState);
        this.collapsibleState = collapsibleState;
        this.resourceUri = resourceUri;
    }
}