import * as vscode from 'vscode';
import { parseEnv, diffEnv } from './env';

export function activate(context: vscode.ExtensionContext) {
    console.log('Varify extension active');

    const disposable = vscode.commands.registerCommand('varify.validateEnvFiles', async () => {
        const folder = vscode.workspace.workspaceFolders?.[0];
        if (!folder) {
            vscode.window.showErrorMessage('Varify: no workspace folder open');
            return;
        }

        const envUri = vscode.Uri.joinPath(folder.uri, '.env');
        const exampleUri = vscode.Uri.joinPath(folder.uri, '.env.example');

        let envContent: Uint8Array;
        let exampleContent: Uint8Array;
        try {
            [envContent, exampleContent] = await Promise.all([
                vscode.workspace.fs.readFile(envUri),
                vscode.workspace.fs.readFile(exampleUri),
            ]);
        } catch (error) {
            vscode.window.showErrorMessage('Varify: unable to read .env or .env.example');
            return;
        }

        const env = parseEnv(Buffer.from(envContent).toString('utf8'));
        const example = parseEnv(Buffer.from(exampleContent).toString('utf8'));
        const diff = diffEnv(example, env);

        if (diff.missing.length === 0 && diff.extra.length === 0) {
            vscode.window.showInformationMessage('Varify: .env matches .env.example');
            return;
        }

        let message = 'Varify validation results:\n';
        if (diff.missing.length > 0) {
            message += `Missing keys: ${diff.missing.join(', ')}\n`;
        }
        if (diff.extra.length > 0) {
            message += `Extra keys: ${diff.extra.join(', ')}\n`;
        }
        vscode.window.showWarningMessage(message);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
