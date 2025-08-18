/*
Observer Pattern Example - Stock Market Tracker

Description:
- Observer Pattern is a behavioral design pattern that defines a one-to-many dependency 
  between objects so that when one object (Subject) changes state, all its dependents 
  (Observers) are notified automatically.
- It decouples the subject from its observers, allowing flexible and dynamic subscriptions.

In this project:
1. Subject: Stock (abstract class provides subscribe, unsubscribe, notify functionality)
2. Concrete Subject: Stock (holds current price)
3. Observer Interface: declares the `update()` method
4. Concrete Observers:
   - TraderApp: reacts to stock price changes
   - Dashboard: displays stock updates
   - EmailNotifier: sends email alerts on price changes
5. Client: creates stock, observers, subscribes observers, and updates stock prices.
*/




// ================= Observer Interface =================
interface Observer {
  update(price: number): void;   // Every observer must implement this method
}

// ================= Subject Interface / Abstract =================
// Abstract class for Subject (Stock) that manages observers
abstract class Subject {
  protected observers: Observer[] = [];  // Array to store all subscribed observers

  // Subscribe a new observer to receive updates
  public subscribe(observer: Observer): void {
    this.observers.push(observer);       // Add observer to the array
  }

  // Unsubscribe an observer to stop receiving updates
  public unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter(obs => obs !== observer); // Remove observer from array
  }

  // Notify all subscribed observers of a state change
  protected notify(): void {
    for (const observer of this.observers) {        // Loop through all observers
      observer.update(this.getState());             // Call observer's update method with current state
    }
  }

  // Abstract method to get the current state of the subject
  // Each concrete subject (like Stock) must implement this
  protected abstract getState(): number;
}

// ================= Concrete Stock Class =================
// Stock class represents a specific stock, extends Subject
class Stock extends Subject {
  private _price: number;   // Internal price of the stock

  constructor(price: number) {
    super();                 // Call the constructor of the parent Subject
    this._price = price;     // Initialize the stock price
  }

  // Setter to update the stock price
  public set price(newPrice: number) {
    console.log(`\nStock price updated: ${newPrice}`); // Log the price change
    this._price = newPrice;      // Update internal price
    this.notify();               // Notify all subscribed observers about the change
  }

  // Getter to read the current stock price
  public get price(): number {
    return this._price;          // Return current price
  }

  // Implementation of abstract getState() method from Subject
  protected getState(): number {
    return this._price;          // Return current price as the subject state
  }
}

// ================= Concrete Observers =================
class TraderApp implements Observer {
  update(price: number): void {
    console.log(`TraderApp: Received stock price update: ${price}`);
  }
}

class Dashboard implements Observer {
  update(price: number): void {
    console.log(`Dashboard: Stock price is now ${price}`);
  }
}

class EmailNotifier implements Observer {
  update(price: number): void {
    console.log(`EmailNotifier: Sending email alert - new stock price: ${price}`);
  }
}

// ================= Usage Example =================
const stock = new Stock(100);            // Create stock (subject)

const trader = new TraderApp();          // Create observers
const dashboard = new Dashboard();
const email = new EmailNotifier();

stock.subscribe(trader);                 // Subscribe observers
stock.subscribe(dashboard);
stock.subscribe(email);

// Update stock prices
stock.price = 120;                       // Notify observers
stock.price = 90;                        // Notify observers

/*
Expected Output:
Stock price updated: 120
TraderApp: Received stock price update: 120
Dashboard: Stock price is now 120
EmailNotifier: Sending email alert - new stock price: 120
Stock price updated: 90
TraderApp: Received stock price update: 90
Dashboard: Stock price is now 90
EmailNotifier: Sending email alert - new stock price: 90
*/