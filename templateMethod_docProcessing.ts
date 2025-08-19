/*
Template Method Pattern - Document Processing Example

Description:
- Template Method defines the skeleton of an algorithm in an abstract class,
  allowing subclasses to implement certain steps without changing the algorithm's structure.
- Here, we model processing different types of documents: PDF, Word, Excel.
- The abstract class defines the sequence: read -> validate -> transform -> save
- Concrete subclasses customize specific steps like reading or transforming.

Key Points:
- Promotes code reuse and loose coupling.
- Fixed algorithm structure in abstract class, flexible steps in subclasses.
- Ideal for workflows with a consistent sequence of operations but variable implementation details.
*/

// ================= Step Interface =================

// Defines a contract for steps (optional, here for educational clarity)
interface IDocumentStep {
  execute(): void;
}

// ================= Abstract Document Processor =================

abstract class DocumentProcessor {
  // Template method: defines the skeleton of document processing
  public processDocument(): void {
    this.read();          // Step 1: read document
    this.validate();      // Step 2: validate content
    this.transform();     // Step 3: transform content
    this.save();          // Step 4: save document
  }

  // Steps that may have default implementation or can be abstract
  protected abstract read(): void;       // Must be implemented by subclass
  protected validate(): void {           // Optional: default validation
    console.log("Validating document...");
  }
  protected abstract transform(): void;  // Must be implemented by subclass
  protected save(): void {               // Default save implementation
    console.log("Saving document...");
  }
}

// ================= Concrete Document Processors =================

// PDF document processor
class PDFProcessor extends DocumentProcessor {
  protected read(): void {
    console.log("Reading PDF document...");
  }

  protected transform(): void {
    console.log("Transforming PDF content...");
  }
}

// Word document processor
class WordProcessor extends DocumentProcessor {
  protected read(): void {
    console.log("Reading Word document...");
  }

  protected transform(): void {
    console.log("Transforming Word content...");
  }
}

// Excel document processor
class ExcelProcessor extends DocumentProcessor {
  protected read(): void {
    console.log("Reading Excel document...");
  }

  protected transform(): void {
    console.log("Transforming Excel content...");
  }
}

// ================= Usage Example =================

console.log("--- Processing PDF ---");
const pdfDoc = new PDFProcessor();
pdfDoc.processDocument();  // Process PDF document

console.log("--- Processing Word ---");
const wordDoc = new WordProcessor();
wordDoc.processDocument(); // Process Word document

console.log("--- Processing Excel ---");
const excelDoc = new ExcelProcessor();
excelDoc.processDocument(); // Process Excel document


/*
Output:

--- Processing PDF ---
Reading PDF document...
Validating document...
Transforming PDF content...
Saving document...

--- Processing Word ---
Reading Word document...
Validating document...
Transforming Word content...
Saving document...

--- Processing Excel ---
Reading Excel document...
Validating document...
Transforming Excel content...
Saving document...
*/
