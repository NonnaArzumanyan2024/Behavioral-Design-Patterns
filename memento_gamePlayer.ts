/*
Memento Pattern Example - Game Player

Description:
- Memento Pattern is a behavioral design pattern that allows capturing and restoring
  an object's internal state without violating encapsulation.
- Using interfaces and abstract classes reduces tight coupling between classes.
- Perfect for "undo" functionality in games or applications.

Key Components:
1. State (Type) - Defines the shape of the player's state.
2. IMemento (Interface) - Represents the Memento; exposes a method to get state.
3. PlayerMemento (Concrete Memento) - Implements IMemento and stores player's state.
4. IOriginator (Interface) - Represents the Originator; can save and restore state.
5. Player (Concrete Originator) - Implements IOriginator; manages player's state.
6. ICaretaker (Interface) - Represents Caretaker; stores and manages mementos.
7. GameHistory (Concrete Caretaker) - Implements ICaretaker; allows undo functionality.

Benefits:
- Decouples player from memento implementation.
- Supports dynamic state saving/restoring.
- Easy to implement undo/redo functionality.
- Follows SOLID principles.
*/




// ================= Memento Interface =================

// Defines the interface that all mementos must implement
interface IMemento {
  // Returns the saved state as an object
  getState(): { level: number; task: string; score: number };
}

// ================= Concrete Memento =================

// Implements IMemento and stores the player's state
class PlayerMemento implements IMemento {
  private level: number;  // Stores player's level
  private task: string;   // Stores player's current task
  private score: number;  // Stores player's current score

  // Constructor initializes the memento with player's state
  constructor(level: number, task: string, score: number) {
    this.level = level;
    this.task = task;
    this.score = score;
  }

  // Return the saved state
  public getState() {
    return {
      level: this.level,
      task: this.task,
      score: this.score,
    };
  }
}

// ================= Originator Interface =================

// Defines the interface for objects that can save and restore state
interface IOriginator {
  save(): IMemento;                   // Save current state into a memento
  restore(memento: IMemento): void;   // Restore state from a memento
  showStatus(): void;                 // Show current state
}

// ================= Concrete Originator =================

// The actual player that can save and restore its state
class Player implements IOriginator {
  private level: number = 1;          // Player initial level
  private task: string = "Tutorial";  // Player initial task
  private score: number = 0;          // Player initial score

  // Show player's current status in console
  public showStatus(): void {
    console.log(`Level: ${this.level}, Task: ${this.task}, Score: ${this.score}`);
  }

  // Update player's state when they play the game
  public play(level: number, task: string, score: number): void {
    this.level = level;     // Update level
    this.task = task;       // Update current task
    this.score = score;     // Update score
    console.log(`Player played: Level=${level}, Task=${task}, Score=${score}`);
  }

  // Save the current state into a memento
  public save(): IMemento {
    return new PlayerMemento(this.level, this.task, this.score);
  }

  // Restore the state from a memento
  public restore(memento: IMemento): void {
    const state = memento.getState();  // Retrieve state from memento
    this.level = state.level;          // Restore level
    this.task = state.task;            // Restore task
    this.score = state.score;          // Restore score
    console.log("Player state restored!");
  }
}

// ================= Caretaker Interface =================

// Defines the interface for managing saved states
interface ICaretaker {
  push(memento: IMemento): void;        // Save a memento
  pop(): IMemento | undefined;          // Undo: get last saved memento
}

// ================= Concrete Caretaker =================

// Manages the history of mementos and allows undo functionality
class GameHistory implements ICaretaker {
  private history: IMemento[] = [];    // Array to store all mementos

  // Add a memento to the history
  public push(memento: IMemento): void {
    this.history.push(memento);        // Add memento to the array
  }

  // Retrieve and remove the last memento (undo)
  public pop(): IMemento | undefined {
    return this.history.pop();         // Return last memento and remove it
  }
}

// ================= Usage Example =================

// Create a player (originator)
const player: IOriginator = new Player();

// Create a caretaker to manage the player's history
const history: ICaretaker = new GameHistory();

console.log("--- Initial Status ---");
player.showStatus();  // Display initial state

console.log("--- Player plays level 2 ---");
player.play(2, "Find the key", 100);  // Player plays level 2
history.push(player.save());           // Save state into history

console.log("--- Player plays level 3 ---");
player.play(3, "Defeat the boss", 250); // Player plays level 3
history.push(player.save());             // Save state into history

console.log("--- Player plays level 4 ---");
player.play(4, "Collect treasures", 400); // Player plays level 4
player.showStatus();                       // Display current state

console.log("--- Undo last move ---");
const lastState = history.pop();          // Get last saved state (undo)
if (lastState) {
  player.restore(lastState);              // Restore state
  player.showStatus();                    // Display restored state
}

console.log("--- Undo another move ---");
const previousState = history.pop();      // Get older saved state (undo)
if (previousState) {
  player.restore(previousState);          // Restore older state
  player.showStatus();                    // Display restored state
}

/*
Expected Output:

--- Initial Status ---
Level: 1, Task: Tutorial, Score: 0
--- Player plays level 2 ---
Player played: Level=2, Task=Find the key, Score=100
--- Player plays level 3 ---
Player played: Level=3, Task=Defeat the boss, Score=250
--- Player plays level 4 ---
Player played: Level=4, Task=Collect treasures, Score=400
Level: 4, Task: Collect treasures, Score: 400
--- Undo last move ---
Player state restored!
Level: 3, Task: Defeat the boss, Score: 250
--- Undo another move ---
Player state restored!
Level: 2, Task: Find the key, Score: 100
*/
