// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

function isTerminalOptions(
  opts: vscode.TerminalOptions | vscode.ExtensionTerminalOptions,
): opts is vscode.TerminalOptions {
  return typeof (opts as vscode.TerminalOptions).cwd != "undefined";
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "open-folder-on-terminal" is now active!',
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "open-folder-on-terminal.openCurrentFileFolderOnTerminal",
    () => {

      const currentFile = vscode.window.activeTextEditor?.document.fileName;
      if (currentFile) {
        const currentPath = currentFile.slice(0, currentFile.lastIndexOf("/"));

        // TODO: reuse terminal if it is on the same cwd and no process running.
        // for (const terminal of vscode.window.terminals) {
        //   const opts = terminal.creationOptions;
        //   if (isTerminalOptions(opts)) {
        //     const { cwd } = opts;
        //     if (cwd && typeof cwd === "string") {
        //       console.log(cwd);
        //     }
        //   }
        // }

        vscode.window.createTerminal({ cwd: currentPath }).show();
      }
    },
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
