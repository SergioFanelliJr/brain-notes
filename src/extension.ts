// VS Code API
import * as vscode from 'vscode';

// Brain Provider
import { BrainProvider } from './BrainProvider/BrainProvider';
import registerBrainCommands from './Commands/commands';







export function activate(context: vscode.ExtensionContext) {
	
	// Register TreeView
	const brainProvider = new BrainProvider();
	brainProvider.register();

	// Register Commands
	registerBrainCommands(brainProvider);





	//#region Debug
	console.log('Congratulations, your extension "brain-notes" is now active!');
	// Define no package.json -> registra o comando com registerCommand
	// O commandId deve ser o mesmo do package.json
	let comandoAtivado = vscode.commands.registerCommand('brain-notes.helloWorld', () => {
		vscode.window.showInformationMessage(' Brain-Notes Ativado!');
	});
	// Registra um disposable para ser descartado quando a extensão for desativada
	context.subscriptions.push(comandoAtivado);
	//#endregion
}

// This method is called when your extension is deactivated
export function deactivate() {}
