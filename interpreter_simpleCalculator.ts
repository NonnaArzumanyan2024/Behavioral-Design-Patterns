/*
Interpreter Design Pattern - Simple Calculator

The Interpreter pattern is a behavioral design pattern that defines a 
representation for a language’s grammar along with an interpreter 
that uses this representation to interpret sentences in that language.

In simple words:
It allows us to create our own small "language" with rules 
(grammar) and a way to evaluate/execute sentences in that language.

In this example:
- IExpression = interface for all expressions
- AddExpression, SubtractExpression, MultiplyExpression = concrete expressions
- CalculatorInterpreter = interpreter that reads commands and executes the right expression

How it works:
1. Each command string is parsed into an expression object.
2. The expression object has an `interpret()` method that calculates the result.
3. New expressions can be added easily without changing existing ones.

Benefits:
✔ Clean separation of commands and their execution  
✔ Easy to add new operations  
✔ Great for small domain-specific languages (DSLs)  
✔ Makes the grammar of a simple language explicit and structured  

When to use:
- When you need to interpret and evaluate simple sentences in a custom language  
- When the grammar is simple and unlikely to change much  
- Common in calculators, query languages, configuration interpreters, and rule engines  

Drawbacks:
Can become complex and inefficient for large or complicated grammars  
Not ideal for very big languages (better to use real parsers instead)  
*/




// ========== Expression interface ==========

interface IExpression {
  interpret(): number; // each expression must implement interpret() to return a number
}

// ========== Concrete Expressions ==========

// AddExpression handles addition of two numbers
class AddExpression implements IExpression {
  constructor(private a: number, private b: number) {}
  interpret(): number {
    return this.a + this.b; // return sum
  }
}

// SubtractExpression handles subtraction of two numbers
class SubtractExpression implements IExpression {
  constructor(private a: number, private b: number) {}
  interpret(): number {
    return this.a - this.b; // return difference
  }
}

// MultiplyExpression handles multiplication of two numbers
class MultiplyExpression implements IExpression {
  constructor(private a: number, private b: number) {}
  interpret(): number {
    return this.a * this.b; // return product
  }
}

// ========== Interpreter ==========

class CalculatorInterpreter {
  // Parses a command string and returns the corresponding expression object
  parse(command: string): IExpression | null {
    const parts = command.split(" ");         // split command by spaces
    const operation = parts[0].toUpperCase(); // operation name
    const a = Number(parts[1]);               // first number
    const b = Number(parts[2]);               // second number

    switch (operation) {
      case "ADD":
        return new AddExpression(a, b);
      case "SUBTRACT":
        return new SubtractExpression(a, b);
      case "MULTIPLY":
        return new MultiplyExpression(a, b);
      default:
        console.log(`Unknown operation: ${operation}`);
        return null;
    }
  }

  // Executes the command and returns result
  execute(command: string): void {
    const expression = this.parse(command);
    if (expression) {
      const result = expression.interpret();      // call interpret() to calculate
      console.log(`${command} = ${result}`);      // log result
    }
  }
}

// ========== Usage Example ==========

const interpreter = new CalculatorInterpreter();

interpreter.execute("ADD 5 3");        // 8
interpreter.execute("SUBTRACT 10 2");  // 8
interpreter.execute("MULTIPLY 4 6");   // 24
interpreter.execute("DIVIDE 10 2");    // Unknown operation

/*
Output:

ADD 5 3 = 8
SUBTRACT 10 2 = 8
MULTIPLY 4 6 = 24
Unknown operation: DIVIDE
*/