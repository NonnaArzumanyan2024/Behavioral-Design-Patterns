/*
Strategy Design Pattern - Payment System Example

Definition:
- The Strategy Pattern allows us to define a family of algorithms,
  put each of them in a separate class, and make them interchangeable.
- The client can choose which algorithm (strategy) to use at runtime,
  without changing the client code.

Key Points:
- Promotes loose coupling between the client and algorithms.
- Makes it easy to add new algorithms without modifying existing code.
- Uses interfaces or abstract classes to define the contract for strategies.

Example: Payment System
- We have a PaymentContext (client) that can use different payment strategies.
- Strategies: PayPal, CreditCard, Crypto
- The context delegates the payment process to the selected strategy.
*/



// ================= Payment Strategy Interface =================

// Defines the interface that all payment strategies must implement
interface IPaymentStrategy {
  pay(amount: number): void;  // Perform payment of given amount
}

// ================= Concrete Payment Strategies =================

// Credit card payment implementation
class CreditCardPayment implements IPaymentStrategy {
  private cardNumber: string;      // Credit card number

  constructor(cardNumber: string) {
    this.cardNumber = cardNumber;  // Initialize card number
  }

  public pay(amount: number): void {
    console.log(`Paid $${amount} using Credit Card: ${this.cardNumber}`);
  }
}

// PayPal payment implementation
class PayPalPayment implements IPaymentStrategy {
  private email: string;  // PayPal account email

  constructor(email: string) {
    this.email = email;    // Initialize email
  }

  public pay(amount: number): void {
    console.log(`Paid $${amount} using PayPal account: ${this.email}`);
  }
}

// Bitcoin payment implementation
class BitcoinPayment implements IPaymentStrategy {
  private walletAddress: string;  // Bitcoin wallet address

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress;  // Initialize wallet address
  }

  public pay(amount: number): void {
    console.log(`Paid $${amount} using Bitcoin wallet: ${this.walletAddress}`);
  }
}

// ================= Context Interface =================

// Defines the interface for objects that use a strategy
interface IPaymentContext {
  setPaymentStrategy(strategy: IPaymentStrategy): void;  // Change payment strategy
  pay(amount: number): void;                               // Perform payment
}

// ================= Concrete Context =================

// Represents an online shop or payment processor
class PaymentProcessor implements IPaymentContext {
  private strategy!: IPaymentStrategy;  // Current payment strategy (algorithm)

  // Set the payment strategy dynamically
  public setPaymentStrategy(strategy: IPaymentStrategy): void {
    this.strategy = strategy;
  }

  // Pay using the selected strategy
  public pay(amount: number): void {
    if (!this.strategy) {
      console.log("Please select a payment method first!");
      return;
    }
    this.strategy.pay(amount);  // Delegate to current strategy
  }
}

// ================= Usage Example =================

// Create payment processor (context)
const paymentProcessor: IPaymentContext = new PaymentProcessor();

console.log("--- Using Credit Card ---");
paymentProcessor.setPaymentStrategy(new CreditCardPayment("1234-5678-9012-3456"));
paymentProcessor.pay(100);  // Pay $100 using credit card

console.log("--- Using PayPal ---");
paymentProcessor.setPaymentStrategy(new PayPalPayment("user@example.com"));
paymentProcessor.pay(200);  // Pay $200 using PayPal

console.log("--- Using Bitcoin ---");
paymentProcessor.setPaymentStrategy(new BitcoinPayment("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"));
paymentProcessor.pay(300);  // Pay $300 using Bitcoin

/*
Output:

--- Using Credit Card ---
Paid $100 using Credit Card: 1234-5678-9012-3456
--- Using PayPal ---
Paid $200 using PayPal account: user@example.com
--- Using Bitcoin ---
Paid $300 using Bitcoin wallet: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
*/