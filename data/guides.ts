
import { Guide } from '../types';

export const guides: Guide[] = [
  {
    id: 'getting-started',
    title: 'Getting Started with Formulas',
    category: 'Beginner',
    shortDescription: 'Learn the fundamental concepts of Excel formulas, including syntax and basic operators.',
    content: `
## What is an Excel Formula?
An Excel formula is an expression that operates on values in a range of cells. These formulas return a result, even when it is an error. Formulas allow you to perform calculations, retrieve information, and automate tasks.

### The Anatomy of a Formula
Every formula in Excel must begin with an equals sign (=). This tells Excel that the contents of the cell are a formula.
After the equals sign, a formula includes the elements to be calculated, which are called operands, separated by calculation operators. For example, the formula \`=2+3\` adds 2 and 3.

### Key Components
- **Functions**: Pre-defined formulas that perform a specific calculation. E.g., \`SUM\`, \`AVERAGE\`.
- **Cell References**: A reference to a cell or a range of cells. E.g., \`A1\`, \`C1:C10\`.
- **Constants**: Numbers or text values entered directly into a formula. E.g., \`2\`, \`"Hello"\`.
- **Operators**: Symbols that specify the type of calculation to perform. E.g., \`+\` (addition), \`*\` (multiplication).

### Order of Operations
Excel calculates formulas based on a specific order, often remembered by the acronym PEMDAS/BODMAS:
1.  Parentheses/Brackets
2.  Exponents/Orders
3.  Multiplication and Division (from left to right)
4.  Addition and Subtraction (from left to right)
For example, in \`=5+2*3\`, Excel will first multiply 2 by 3 (6) and then add 5, for a result of 11. To change the order, use parentheses: \`=(5+2)*3\` results in 21.
    `,
  },
  {
    id: 'cell-references',
    title: 'Cell References: Relative, Absolute & Mixed',
    category: 'Beginner',
    shortDescription: 'Understand the crucial difference between relative, absolute, and mixed cell references.',
    content: `
## The Power of Cell References
Cell references are one of the most powerful features in Excel. They allow your formulas to be dynamic. When you copy a formula, the references can change automatically, saving you a lot of time.

### Relative References (e.g., A1)
This is the default reference type. When you copy a formula with relative references to another cell, the references adjust relative to their new position.
- **Example**: If you have \`=A1+B1\` in cell C1 and you copy it to C2, the formula will automatically become \`=A2+B2\`.
- **Use Case**: Perfect for applying the same calculation across rows or columns, like summing up line items.

### Absolute References (e.g., $A$1)
An absolute reference is locked to a specific cell. It does not change when the formula is copied. You create an absolute reference by adding dollar signs ($) before the column letter and the row number.
- **Example**: If you have \`=A1*$B$1\` in cell C1 and you copy it to C2, the formula becomes \`=A2*$B$1\`. The reference to B1 stays the same.
- **Use Case**: Ideal for constants that are used in many calculations, such as a tax rate or a commission percentage.

### Mixed References (e.g., $A1 or A$1)
A mixed reference has either an absolute column and a relative row, or a relative column and an absolute row.
- **$A1**: The column is locked, but the row is relative. When copied, the column will always be A, but the row number will change.
- **A$1**: The row is locked, but the column is relative. When copied, the row will always be 1, but the column letter will change.
- **Use Case**: Useful for creating lookup tables or multiplication tables where you need to reference a specific row or column header.

### Pro Tip
You can quickly toggle between reference types by selecting the reference in the formula bar and pressing the **F4** key.
    `,
  },
  {
    id: 'xlookup-vs-vlookup',
    title: 'XLOOKUP vs. VLOOKUP',
    category: 'Intermediate',
    shortDescription: 'Discover why XLOOKUP is the modern, more powerful successor to VLOOKUP and HLOOKUP.',
    content: `
## The Evolution of Lookups
For years, VLOOKUP was the go-to function for finding data in a table. However, it has several limitations. Microsoft introduced XLOOKUP to address these shortcomings and provide a more flexible and powerful lookup function.

### VLOOKUP's Limitations
1.  **Left-to-Right Only**: VLOOKUP can only look for a value in the leftmost column of a table and return a value from a column to its right.
2.  **Column Index Number**: You have to specify the column to return from using a number (e.g., 3 for the 3rd column), which is fragile. If you insert or delete a column, your formula breaks.
3.  **Exact Match Default**: By default, VLOOKUP performs an approximate match, which can lead to incorrect results if you're not careful. You must specify \`FALSE\` for an exact match.
4.  **Error Handling**: It returns a #N/A error if no match is found, requiring you to wrap it in an IFERROR function.

### Why XLOOKUP is Better
XLOOKUP solves all of VLOOKUP's problems and adds more features.
Its syntax is: \`=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])\`

1.  **Any Direction**: It can look in any column (or row) and return a value from any other column (or row). The lookup and return arrays are separate.
2.  **Separate Return Array**: You specify the exact array to return from, making it robust against changes in table structure.
3.  **Exact Match by Default**: XLOOKUP defaults to an exact match, which is safer and what users want most of the time.
4.  **Built-in Error Handling**: It has an optional \`if_not_found\` argument, so you don't need to use IFERROR.
5.  **More Match Options**: You can easily specify approximate matches (next smaller or next larger item).
6.  **Search Direction**: You can search from top-to-bottom (default) or bottom-to-top.

### The Verdict
If you have access to XLOOKUP (available in Excel 365, Excel 2021, and Excel for the web), you should almost always use it instead of VLOOKUP or HLOOKUP. It is simpler, safer, and far more powerful.
    `,
  },
  {
    id: 'dynamic-arrays',
    title: 'Intro to Dynamic Arrays',
    category: 'Intermediate',
    shortDescription: 'Learn about the new calculation engine and functions that "spill" results into multiple cells.',
    content: `
## The Spilling Revolution
Dynamic Arrays are a game-changer in Excel. They fundamentally change how formulas are calculated. With dynamic arrays, a single formula entered in one cell can return an array of values that automatically "spill" into neighboring empty cells.

### What is Spilling?
Previously, if you wanted a formula to return multiple values (an array formula), you had to pre-select the output range and enter the formula with Ctrl+Shift+Enter (CSE). This was complicated and rigid.
Now, you just enter the formula in one cell, press Enter, and Excel automatically determines the size of the output and fills the required range. The range occupied by the spilled results is called the **Spill Range**.

### The Spill Range
The spill range has a distinct blue border when you select a cell within it. You can only edit the formula in the top-left cell of the range. If you try to edit any other cell, you'll see the formula is greyed out.

### The #SPILL! Error
If something is blocking the spill range (like text or another value), you will get a #SPILL! error. Clear the blocking cells, and the formula will spill correctly.

### Dynamic Array Functions
Microsoft introduced a set of powerful new functions designed to work with dynamic arrays:
- **FILTER**: Filter a range of data based on criteria you define.
- **SORT**: Sort a range of data.
- **UNIQUE**: Extract a list of unique values from a range.
- **SEQUENCE**: Generate a sequence of numbers.
- **RANDARRAY**: Generate an array of random numbers.
- **SORTBY**: Sort a range based on the values in a corresponding range.

These functions, combined with the new spilling behavior, allow you to create complex and dynamic reports with much simpler formulas than were possible before.
    `
  }
];
