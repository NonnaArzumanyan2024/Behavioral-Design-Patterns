/*
Command Pattern - Text Editor Example

Description:
- The Command Pattern is a behavioral design pattern that turns a request 
  into a stand-alone object that contains all information about the action.
- It decouples the object that invokes the operation (Invoker) from the 
  object that performs it (Receiver), making the system flexible and extensible.
- It allows storing, queuing, and undoing operations easily.

Key Concepts in this Example:
1. Command Interface: Declares the `execute()` and `undo()` methods.
2. Concrete Commands: Implements specific actions:
   - TypeCommand: adds text to the editor.
   - DeleteCommand: removes text from the editor.
3. Receiver (TextEditor): The object that performs the actual operations (type/delete text).
4. Invoker (EditorInvoker): Executes commands and keeps a history for undo.
5. Client: Creates commands, passes them to the invoker, and interacts with the editor.

How the Code Works:
- The client creates a TextEditor (receiver) and an EditorInvoker (invoker).
- Each action (typing, deleting) is wrapped in a Command object.
- The invoker executes commands and stores them in a history array.
- The undo() method in the invoker calls the command's undo() method to revert actions.

Benefits:
- Decouples sender and receiver.
- Supports undo/redo functionality.
- Makes adding new operations easy without changing existing code.
- Keeps code organized and clean, avoiding large if/else blocks for operations.

Example Flow:
1. Type 'Hello' -> TypeCommand executed.
2. Type ' World' -> TypeCommand executed.
3. Delete last 6 characters -> DeleteCommand executed.
4. Undo last command -> deleted text restored.
5. Undo previous commands -> all typing undone step by step.

This code demonstrates a simple text editor using the Command Pattern 
with full undo functionality in a clear and understandable way.
*/



// ================ Command Interface =========
interface Command {
  execute(): void;       // Execute the action
  undo(): void;          // Undo the action
}

// ================ Receiver ==================
class TextEditor {
  private text: string = "";    // Holds the current text in the editor

  // Add text to editor
  public addText(newText: string): void {
    this.text += newText;       // Append new text at the end
  }

  // Delete last N characters
  public deleteText(count: number): void {
    this.text = this.text.slice(0, -count); // Remove last 'count' characters
  }

  // Show current text in console
  public showText(): void {
    console.log(`Current Text: "${this.text}"`);
  }
}

// ================ Concrete Commands =========

// Command to type text
class TypeCommand implements Command {
  private editor: TextEditor;   // Receiver reference
  private textToAdd: string;    // Text to type

  constructor(editor: TextEditor, textToAdd: string) {
    this.editor = editor;       // Store receiver
    this.textToAdd = textToAdd; // Store text for execute & undo
  }

  public execute(): void {
    this.editor.addText(this.textToAdd);   // Perform typing
  }

  public undo(): void {
    this.editor.deleteText(this.textToAdd.length); // Undo typing by deleting last typed characters
  }
}

// Command to delete last N characters
class DeleteCommand implements Command {
  private editor: TextEditor;         // Receiver reference
  private deletedText: string = "";   // Stores deleted text to undo
  private count: number;              // Number of characters to delete

  constructor(editor: TextEditor, count: number) {
    this.editor = editor;            // Store receiver
    this.count = count;              // Store count
  }

  public execute(): void {
    const currentText = this.getEditorText();           // Get current text
    this.deletedText = currentText.slice(-this.count);  // Save text that will be deleted
    this.editor.deleteText(this.count);                 // Delete last 'count' characters
  }

  public undo(): void {
    this.editor.addText(this.deletedText);         // Restore deleted text
  }

  // Helper to read private 'text' from TextEditor
  private getEditorText(): string {
    return (this.editor as any).text;              // TypeScript hack to access private property
  }
}

// ================ Invoker ===================
class EditorInvoker {
  private history: Command[] = [];  // Stores executed commands for undo

  // Execute a command and save to history
  public executeCommand(command: Command): void {
    command.execute();               // Perform the action
    this.history.push(command);      // Save command for possible undo
  }

  // Undo the last command
  public undo(): void {
    const command = this.history.pop();  // Remove last command from history
    if (command) {
      command.undo();                    // Undo the command
    } else {
      console.log("Nothing to undo");    // No commands left
    }
  }
}

// ================ Usage Example =============
const editor = new TextEditor();       // Create the receiver (TextEditor)
const invoker = new EditorInvoker();   // Create the invoker

console.log("--- Typing 'Hello' ---");
invoker.executeCommand(new TypeCommand(editor, "Hello")); // Execute typing command
editor.showText();                                        // Show current text

console.log("--- Typing ' World' ---");
invoker.executeCommand(new TypeCommand(editor, " World"));// Execute typing command
editor.showText();                                        // Show current text

console.log("--- Deleting last 6 characters ---");
invoker.executeCommand(new DeleteCommand(editor, 6));     // Execute delete command
editor.showText();                                        // Show current text

console.log("--- Undo last command ---");
invoker.undo();                                           // Undo delete
editor.showText();                                        // Show current text

console.log("--- Undo last command ---");
invoker.undo();                                           // Undo typing ' World'
editor.showText();                                        // Show current text

console.log("--- Undo last command ---");
invoker.undo();                                           // Undo typing 'Hello'
editor.showText();                                        // Show current text


/*
Output:

--- Typing 'Hello' ---
Current Text: "Hello"

--- Typing ' World' ---
Current Text: "Hello World"

--- Deleting last 6 characters ---
Current Text: "Hello"

--- Undo last command ---
Current Text: "Hello World"

--- Undo last command ---
Current Text: "Hello"

--- Undo last command ---
Current Text: ""
*/