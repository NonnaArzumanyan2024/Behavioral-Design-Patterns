/*
Visitor Design Pattern - Shopping Cart System 

The Visitor pattern is a behavioral design pattern that allows you 
to add new operations to objects without changing their classes. 
It is especially useful when you have a complex object structure 
and you want to perform multiple unrelated operations on them.

Key idea:
- Instead of putting all operations inside the classes themselves, 
  you create a separate "Visitor" object that implements operations for each type.
- Each object in the structure implements an `accept(visitor)` method,
  which calls the appropriate method on the visitor.
- This way, you can add new operations easily without touching the existing classes.

In this example:
- IItem = interface for all shopping cart items
- Book, Fruit, Electronics = concrete items
- IVisitor = interface for visitor operations
- PriceCalculator = concrete visitor to calculate total price
- ShoppingCart = context holding items

How it works:
1. Each item has an `accept(visitor)` method.
2. The visitor object has a method for each item type (`visitBook`, `visitFruit`, `visitElectronics`).
3. When `accept` is called on an item, it delegates the operation to the visitor.
4. You can add new visitors (e.g., DiscountCalculator, ShippingCalculator) 
   without modifying item classes.

Benefits:
Add new operations easily without touching item classes
Keep item classes clean and focused on their own data
Loosely coupled system
Easy to extend with new visitors
Great for complex object structures

Use cases:
- Shopping carts (calculate price, apply discounts)
- Compilers (operations on different types of AST nodes)
- Document processing (export to PDF, HTML, Markdown)
- Any scenario where operations on objects are needed without modifying their classes
*/




// ========== Visitor interface ==========

interface IVisitor {
  visitBook(book: Book): number;                       // operation to handle Book item
  visitFruit(fruit: Fruit): number;                    // operation to handle Fruit item
  visitElectronics(electronics: Electronics): number;  // operation to handle Electronics item
}

// ========== Item interface ==========

interface IItem {
  name: string;                                      // name of the item
  price: number;                                     // base price of the item
  accept(visitor: IVisitor): number;                 // accept a visitor to perform operation
}


// ========== Concrete Items ==========

// Book item class implementing IItem
class Book implements IItem {
  name: string;                                     // name of the book
  price: number;                                    // price of the book

  constructor(name: string, price: number) {        // constructor to initialize book
    this.name = name;
    this.price = price;
  }

  accept(visitor: IVisitor): number {              // accept a visitor
    return visitor.visitBook(this);                // delegate operation to visitor's visitBook method
  }
}

// Fruit item class implementing IItem
class Fruit implements IItem {
  name: string;                                     // name of the fruit
  price: number;                                    // price per unit of fruit
  quantity: number;                                 // quantity of fruit purchased

  constructor(name: string, price: number, quantity: number) { // constructor to initialize fruit
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  accept(visitor: IVisitor): number {              // accept a visitor
    return visitor.visitFruit(this);               // delegate operation to visitor's visitFruit method
  }
}

// Electronics item class implementing IItem
class Electronics implements IItem {
  name: string;                                     // name of the electronic item
  price: number;                                    // base price of electronic item

  constructor(name: string, price: number) {        // constructor to initialize electronics
    this.name = name;
    this.price = price;
  }

  accept(visitor: IVisitor): number {              // accept a visitor
    return visitor.visitElectronics(this);         // delegate operation to visitor's visitElectronics method
  }
}

// ========== Concrete Visitor ==========

class PriceCalculator implements IVisitor {

  // Calculate price for Book
  visitBook(book: Book): number {
    console.log(`Book: ${book.name}, price: $${book.price}`); // log book info
    return book.price;                                        // return book price
  }

  // Calculate price for Fruit (consider quantity)
  visitFruit(fruit: Fruit): number {
    const total = fruit.price * fruit.quantity;              // multiply price by quantity
    console.log(`Fruit: ${fruit.name}, quantity: ${fruit.quantity}, total: $${total}`); // log fruit info
    return total;                                            // return total price for fruit
  }

  // Calculate price for Electronics with 10% tax
  visitElectronics(electronics: Electronics): number {
    const total = electronics.price * 1.1;                  // add 10% tax
    console.log(`Electronics: ${electronics.name}, price with tax: $${total.toFixed(2)}`); // log info
    return total;                                           // return total price
  }
}


// ========== Shopping Cart ==========

class ShoppingCart {
  private items: IItem[] = [];                               // store items in the cart

  // Add an item to the shopping cart
  addItem(item: IItem): void {
    this.items.push(item);                                   // push item into array
  }

  // Calculate total price using a visitor
  calculateTotal(visitor: IVisitor): number {
    let total = 0;                                           // initialize total price
    for (const item of this.items) {                         // iterate over all items
      total += item.accept(visitor);                         // let visitor calculate price for each item
    }
    return total;                                            // return total price
  }
}


// ========== Usage Example ==========

const cart = new ShoppingCart();                             // create a new shopping cart

// Add items to the cart
cart.addItem(new Book("Design Patterns", 30));              // add a book
cart.addItem(new Fruit("Apple", 2, 5));                     // add 5 apples
cart.addItem(new Electronics("Headphones", 100));           // add electronics

const priceCalculator = new PriceCalculator();              // create a price calculator visitor
const total = cart.calculateTotal(priceCalculator);         // calculate total price using visitor

console.log(`\nTotal Price: $${total.toFixed(2)}`);         // log final total price


/*
Output:

Book: Design Patterns, price: $30
Fruit: Apple, quantity: 5, total: $10
Electronics: Headphones, price with tax: $110.00

Total Price: $150.00
*/