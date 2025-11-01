import { ExcelFunction } from '../types';

export const functions: ExcelFunction[] = [
  // Math & Trig
  {
    name: 'SUM',
    category: 'Math & Trig',
    shortDescription: 'Adds all the numbers in a range of cells.',
    syntax: 'SUM(number1, [number2], ...)',
    arguments: [
      { name: 'number1', description: 'The first number to add. This can be a number, a cell reference, or a range.', required: true, type: 'Number/Range' },
      { name: 'number2', description: 'Optional. Additional numbers or ranges to add, up to 255.', required: false, type: 'Number/Range' },
    ],
    returns: { type: 'Number', description: 'The sum of all specified numbers.' },
    examples: [
      {
        description: 'Sum a range of cells.',
        formula: '=SUM(A1:A3)',
        result: '60',
        data: { headers: ['A'], rows: [[10], [20], [30]] },
      },
      {
        description: 'Sum individual numbers and a range.',
        formula: '=SUM(5, 15, A1:A2)',
        result: '50',
        data: { headers: ['A'], rows: [[10], [20]] },
      },
    ],
    commonErrors: [
        { error: '#VALUE!', description: 'Occurs if any of the arguments are text values that cannot be interpreted as numbers.' }
    ],
    pitfalls: ['Text values and logical values (TRUE/FALSE) in ranges are ignored.'],
    notes: ['SUM is one of the most fundamental and widely used functions in Excel.'],
    versionIntroduced: 'Excel 2000',
    tags: ['math', 'addition', 'total', 'basic'],
    difficulty: 'Beginner',
    relatedFunctions: ['SUMIF', 'SUMIFS', 'SUMPRODUCT'],
  },
  {
    name: 'AVERAGE',
    category: 'Math & Trig',
    shortDescription: 'Returns the average (arithmetic mean) of its arguments.',
    syntax: 'AVERAGE(number1, [number2], ...)',
    arguments: [
      { name: 'number1', description: 'The first number, cell reference, or range for which you want the average.', required: true, type: 'Number/Range' },
      { name: 'number2', description: 'Optional. Additional numbers, cell references or ranges.', required: false, type: 'Number/Range' },
    ],
    returns: { type: 'Number', description: 'The average of the supplied numbers.' },
    examples: [
      {
        description: 'Calculate the average of a list of numbers.',
        formula: '=AVERAGE(A1:A5)',
        result: '30',
        data: { headers: ['Sales'], rows: [[10], [20], [30], [40], [50]] },
      },
    ],
    commonErrors: [
      { error: '#DIV/0!', description: 'Occurs if the supplied range contains no numbers.' },
    ],
    pitfalls: ['Cells containing text or empty cells are ignored. To include 0 values, they must be entered as the number 0.'],
    notes: ['Use AVERAGEA to include logical values and text representations of numbers in the calculation.'],
    versionIntroduced: 'Excel 2000',
    tags: ['math', 'mean', 'statistics', 'basic'],
    difficulty: 'Beginner',
    relatedFunctions: ['AVERAGEA', 'AVERAGEIF', 'MEDIAN', 'MODE'],
  },
  {
    name: 'COUNT',
    category: 'Statistical',
    shortDescription: 'Counts the number of cells that contain numbers.',
    syntax: 'COUNT(value1, [value2], ...)',
    arguments: [
        { name: 'value1', description: 'The first item, cell reference, or range within which you want to count numbers.', required: true, type: 'Any' },
        { name: 'value2', description: 'Optional. Additional items to count.', required: false, type: 'Any' },
    ],
    returns: { type: 'Number', description: 'The count of cells containing numeric values.' },
    examples: [
      {
        description: 'Count the number of cells with numbers in a mixed-data range.',
        formula: '=COUNT(A1:A5)',
        result: '3',
        data: { headers: ['Data'], rows: [[10], ['Apples'], [30], [""], [5]] },
      },
    ],
    commonErrors: [],
    pitfalls: ['COUNT ignores text, errors, logical values, and empty cells. Use COUNTA to count non-empty cells, or COUNTBLANK for empty cells.'],
    notes: ['Dates are stored as serial numbers in Excel, so COUNT will include them in its count.'],
    versionIntroduced: 'Excel 2000',
    tags: ['statistics', 'count', 'numbers', 'basic'],
    difficulty: 'Beginner',
    relatedFunctions: ['COUNTA', 'COUNTBLANK', 'COUNTIF'],
  },
  // ... (Adding more Math & Trig)
  {
    name: 'SUMIF',
    category: 'Math & Trig',
    shortDescription: 'Sums the values in a range that meet a single criterion.',
    syntax: 'SUMIF(range, criteria, [sum_range])',
    arguments: [
      { name: 'range', description: 'The range of cells you want to evaluate by your criteria.', required: true, type: 'Range' },
      { name: 'criteria', description: 'The condition that defines which cells will be added.', required: true, type: 'Text/Number/Expression' },
      { name: 'sum_range', description: 'Optional. The actual cells to sum. If omitted, the cells in `range` are summed.', required: false, type: 'Range' },
    ],
    returns: { type: 'Number', description: 'The sum of cells that meet the criteria.' },
    examples: [
      {
        description: 'Sum sales for a specific product.',
        formula: '=SUMIF(A1:A4, "Apples", B1:B4)',
        result: '35',
        data: { headers: ['Product', 'Sales'], rows: [['Apples', 10], ['Oranges', 20], ['Apples', 25], ['Oranges', 15]] },
      },
      {
        description: 'Sum all values greater than 100.',
        formula: '=SUMIF(A1:A4, ">100")',
        result: '350',
        data: { headers: ['Values'], rows: [[50], [150], [200], [90]] },
      }
    ],
    commonErrors: [],
    pitfalls: ['The `criteria` argument must be enclosed in double quotes if it is text or includes logical operators (e.g., ">100", "Apples").'],
    notes: ['For multiple criteria, use the more powerful SUMIFS function.'],
    versionIntroduced: 'Excel 2000',
    tags: ['math', 'conditional sum', 'criteria'],
    difficulty: 'Intermediate',
    relatedFunctions: ['SUM', 'SUMIFS', 'COUNTIF'],
  },
  {
    name: 'SUMIFS',
    category: 'Math & Trig',
    shortDescription: 'Sums the values in a range that meet multiple criteria.',
    syntax: 'SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)',
    arguments: [
      { name: 'sum_range', description: 'The range of cells to sum.', required: true, type: 'Range' },
      { name: 'criteria_range1', description: 'The first range to evaluate.', required: true, type: 'Range' },
      { name: 'criteria1', description: 'The criteria to use on the first range.', required: true, type: 'Any' },
      { name: 'criteria_range2', description: 'Optional. The second range to evaluate.', required: false, type: 'Range' },
      { name: 'criteria2', description: 'Optional. The criteria for the second range.', required: false, type: 'Any' },
    ],
    returns: { type: 'Number', description: 'The sum of cells that meet all specified criteria.' },
    examples: [
      {
        description: 'Sum sales for a specific product in a specific region.',
        formula: '=SUMIFS(C1:C4, A1:A4, "Apples", B1:B4, "East")',
        result: '10',
        data: { headers: ['Product', 'Region', 'Sales'], rows: [['Apples', 'East', 10], ['Oranges', 'East', 20], ['Apples', 'West', 25], ['Oranges', 'West', 15]] },
      },
    ],
    commonErrors: [],
    pitfalls: ['All criteria ranges must have the same size and shape as the sum_range.'],
    notes: ['The order of arguments is different from SUMIF. The `sum_range` comes first in SUMIFS.'],
    versionIntroduced: 'Excel 2007',
    tags: ['math', 'multiple criteria', 'conditional sum'],
    difficulty: 'Intermediate',
    relatedFunctions: ['SUMIF', 'COUNTIFS', 'AVERAGEIFS'],
  },
  {
    name: 'ROUND',
    category: 'Math & Trig',
    shortDescription: 'Rounds a number to a specified number of digits.',
    syntax: 'ROUND(number, num_digits)',
    arguments: [
        { name: 'number', description: 'The number you want to round.', required: true, type: 'Number' },
        { name: 'num_digits', description: 'The number of digits to which you want to round the number argument.', required: true, type: 'Number' },
    ],
    returns: { type: 'Number', description: 'The rounded number.' },
    examples: [
      {
        description: 'Round a number to two decimal places.',
        formula: '=ROUND(123.456, 2)',
        result: '123.46',
      },
      {
        description: 'Round a number to the nearest integer.',
        formula: '=ROUND(123.456, 0)',
        result: '123',
      },
      {
        description: 'Round a number to the nearest 10.',
        formula: '=ROUND(123.456, -1)',
        result: '120',
      },
    ],
    commonErrors: [],
    pitfalls: ['A `num_digits` greater than 0 rounds to the right of the decimal point. A `num_digits` of 0 rounds to the nearest integer. A `num_digits` less than 0 rounds to the left of the decimal point.'],
    notes: ['Use ROUNDUP to always round away from zero, and ROUNDDOWN to always round toward zero.'],
    versionIntroduced: 'Excel 2000',
    tags: ['math', 'rounding', 'decimal'],
    difficulty: 'Beginner',
    relatedFunctions: ['ROUNDUP', 'ROUNDDOWN', 'MROUND', 'INT', 'TRUNC'],
  },

  // Logical
  {
    name: 'IF',
    category: 'Logical',
    shortDescription: 'Checks whether a condition is met, and returns one value if TRUE, and another value if FALSE.',
    syntax: 'IF(logical_test, value_if_true, [value_if_false])',
    arguments: [
      { name: 'logical_test', description: 'Any value or expression that can be evaluated to TRUE or FALSE.', required: true, type: 'Logical' },
      { name: 'value_if_true', description: 'The value that is returned if logical_test is TRUE.', required: true, type: 'Any' },
      { name: 'value_if_false', description: 'Optional. The value that is returned if logical_test is FALSE. If omitted, FALSE is returned.', required: false, type: 'Any' },
    ],
    returns: { type: 'Any', description: 'Returns `value_if_true` if the condition is met, otherwise `value_if_false`.' },
    examples: [
      {
        description: 'Check if a score is a "Pass" or "Fail".',
        formula: '=IF(A1>=50, "Pass", "Fail")',
        result: 'Pass',
        data: { headers: ['Score'], rows: [[75]] },
      },
      {
        description: 'Nesting IF statements for multiple conditions.',
        formula: '=IF(A1>89, "A", IF(A1>79, "B", "C"))',
        result: 'A',
        data: { headers: ['Score'], rows: [[92]] },
      }
    ],
    commonErrors: [],
    pitfalls: ['For multiple conditions, nested IFs can become complex. Consider using IFS or a lookup function instead.'],
    notes: ['The IF function is a cornerstone of building logic in Excel spreadsheets.'],
    versionIntroduced: 'Excel 2000',
    tags: ['logical', 'condition', 'decision'],
    difficulty: 'Beginner',
    relatedFunctions: ['IFS', 'AND', 'OR', 'NOT'],
  },
  {
    name: 'AND',
    category: 'Logical',
    shortDescription: 'Returns TRUE if all of its arguments are TRUE.',
    syntax: 'AND(logical1, [logical2], ...)',
    arguments: [
        { name: 'logical1', description: 'The first condition to test.', required: true, type: 'Logical' },
        { name: 'logical2', description: 'Optional. Additional conditions to test.', required: false, type: 'Logical' },
    ],
    returns: { type: 'Boolean', description: 'TRUE if all arguments evaluate to TRUE; otherwise, FALSE.' },
    examples: [
      {
        description: 'Check if a value is between 50 and 100.',
        formula: '=AND(A1>50, A1<100)',
        result: 'TRUE',
        data: { headers: ['Value'], rows: [[75]] },
      },
    ],
    commonErrors: [],
    pitfalls: [],
    notes: ['Often used within the `logical_test` argument of an IF function.'],
    versionIntroduced: 'Excel 2000',
    tags: ['logical', 'multiple conditions', 'all true'],
    difficulty: 'Beginner',
    relatedFunctions: ['OR', 'NOT', 'IF'],
  },
  {
    name: 'OR',
    category: 'Logical',
    shortDescription: 'Returns TRUE if any argument is TRUE.',
    syntax: 'OR(logical1, [logical2], ...)',
    arguments: [
        { name: 'logical1', description: 'The first condition to test.', required: true, type: 'Logical' },
        { name: 'logical2', description: 'Optional. Additional conditions to test.', required: false, type: 'Logical' },
    ],
    returns: { type: 'Boolean', description: 'TRUE if any argument evaluates to TRUE; otherwise, FALSE.' },
    examples: [
      {
        description: 'Check if a product is "Apples" or "Oranges".',
        formula: '=OR(A1="Apples", A1="Oranges")',
        result: 'TRUE',
        data: { headers: ['Product'], rows: [['Apples']] },
      },
    ],
    commonErrors: [],
    pitfalls: [],
    notes: ['Useful inside an IF function to test for multiple possible valid conditions.'],
    versionIntroduced: 'Excel 2000',
    tags: ['logical', 'multiple conditions', 'any true'],
    difficulty: 'Beginner',
    relatedFunctions: ['AND', 'NOT', 'IF'],
  },
  {
    name: 'IFS',
    category: 'Logical',
    shortDescription: 'Checks whether one or more conditions are met and returns a value corresponding to the first TRUE condition.',
    syntax: 'IFS(logical_test1, value_if_true1, [logical_test2, value_if_true2], ...)',
    arguments: [
      { name: 'logical_test1', description: 'The first logical condition to evaluate.', required: true, type: 'Logical' },
      { name: 'value_if_true1', description: 'The result to return if the first condition is TRUE.', required: true, type: 'Any' },
      { name: 'logical_test2', description: 'Optional. The second logical condition.', required: false, type: 'Logical' },
      { name: 'value_if_true2', description: 'Optional. The result for the second condition.', required: false, type: 'Any' },
    ],
    returns: { type: 'Any', description: 'The value corresponding to the first TRUE condition.' },
    examples: [
      {
        description: 'Assign grades based on scores without nesting IFs.',
        formula: '=IFS(A1>89, "A", A1>79, "B", A1>69, "C", TRUE, "D")',
        result: 'B',
        data: { headers: ['Score'], rows: [[85]] },
      }
    ],
    commonErrors: [
      { error: '#N/A', description: 'Occurs if no conditions are met and no "catch-all" (like TRUE, "Other") is provided.' }
    ],
    pitfalls: ['The order of conditions matters. IFS stops at the first TRUE condition.'],
    notes: ['A much cleaner alternative to complex nested IF statements. The final `TRUE` condition acts as an "else".'],
    versionIntroduced: 'Excel 2019 / O365',
    tags: ['logical', 'multiple conditions', 'switch'],
    difficulty: 'Intermediate',
    relatedFunctions: ['IF', 'SWITCH'],
  },

  // Lookup & Reference
  {
    name: 'VLOOKUP',
    category: 'Lookup & Reference',
    shortDescription: 'Looks for a value in the leftmost column of a table, and then returns a value in the same row from a column you specify.',
    syntax: 'VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])',
    arguments: [
      { name: 'lookup_value', description: 'The value to search for.', required: true, type: 'Any' },
      { name: 'table_array', description: 'The range of cells that contains the data.', required: true, type: 'Range' },
      { name: 'col_index_num', description: 'The column number in table_array from which the matching value should be returned.', required: true, type: 'Number' },
      { name: 'range_lookup', description: 'Optional. A logical value: TRUE for an approximate match (default), FALSE for an exact match.', required: false, type: 'Boolean' },
    ],
    returns: { type: 'Any', description: 'The value found in the table.' },
    examples: [
      {
        description: 'Find the price of a specific product.',
        formula: '=VLOOKUP("Banana", A1:B3, 2, FALSE)',
        result: '0.79',
        data: { headers: ['Product', 'Price'], rows: [['Apple', 1.29], ['Banana', 0.79], ['Cherry', 3.49]] },
      },
    ],
    commonErrors: [
      { error: '#N/A', description: 'Occurs if the lookup_value is not found in the first column of the table_array.' },
      { error: '#REF!', description: 'Occurs if col_index_num is greater than the number of columns in table_array.' },
    ],
    pitfalls: ['The lookup column MUST be the first column in the `table_array`.', 'Defaults to an approximate match, which can lead to errors. Almost always use FALSE for an exact match.'],
    notes: ['VLOOKUP is a classic function, but the modern XLOOKUP is more powerful and flexible.'],
    versionIntroduced: 'Excel 2000',
    tags: ['lookup', 'find', 'search', 'vertical'],
    difficulty: 'Intermediate',
    relatedFunctions: ['XLOOKUP', 'HLOOKUP', 'INDEX', 'MATCH'],
  },
  {
    name: 'XLOOKUP',
    category: 'Lookup & Reference',
    shortDescription: 'A modern and flexible replacement for VLOOKUP. Searches a range or an array and returns the corresponding item from a second range or array.',
    syntax: 'XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])',
    arguments: [
      { name: 'lookup_value', description: 'The value to search for.', required: true, type: 'Any' },
      { name: 'lookup_array', description: 'The array or range to search.', required: true, type: 'Range' },
      { name: 'return_array', description: 'The array or range to return from.', required: true, type: 'Range' },
      { name: 'if_not_found', description: 'Optional. Value to return if no match is found.', required: false, type: 'Any' },
      { name: 'match_mode', description: 'Optional. 0 for exact match (default), -1 for next smaller, 1 for next larger, 2 for wildcard.', required: false, type: 'Number' },
      { name: 'search_mode', description: 'Optional. 1 for first-to-last (default), -1 for last-to-first.', required: false, type: 'Number' },
    ],
    returns: { type: 'Any', description: 'The value found, or the `if_not_found` value.' },
    examples: [
      {
        description: 'Find an employee\'s department by their ID.',
        formula: '=XLOOKUP(102, A2:A4, B2:B4, "Not Found")',
        result: 'Marketing',
        data: { headers: ['ID', 'Department', 'Name'], rows: [[101, 'Sales', 'John'], [102, 'Marketing', 'Jane'], [103, 'HR', 'Mike']] },
      },
      {
        description: 'Look up from right to left, finding the name by department.',
        formula: '=XLOOKUP("HR", B2:B4, C2:C4)',
        result: 'Mike',
        data: { headers: ['ID', 'Department', 'Name'], rows: [[101, 'Sales', 'John'], [102, 'Marketing', 'Jane'], [103, 'HR', 'Mike']] },
      }
    ],
    commonErrors: [
        { error: '#N/A', description: 'Occurs if a valid match is not found and the [if_not_found] argument is omitted.' }
    ],
    pitfalls: ['Lookup_array and return_array must have compatible dimensions.'],
    notes: ['XLOOKUP is the recommended lookup function for modern Excel. It replaces VLOOKUP, HLOOKUP, and INDEX/MATCH in most cases.'],
    versionIntroduced: 'Excel 2021 / O365',
    tags: ['lookup', 'find', 'search', 'modern', 'vlookup replacement'],
    difficulty: 'Intermediate',
    relatedFunctions: ['VLOOKUP', 'INDEX', 'MATCH', 'FILTER'],
  },
  {
    name: 'INDEX',
    category: 'Lookup & Reference',
    shortDescription: 'Returns a value or reference of the cell at the intersection of a particular row and column, in a given range.',
    syntax: 'INDEX(array, row_num, [column_num])',
    arguments: [
      { name: 'array', description: 'A range of cells or an array constant.', required: true, type: 'Range' },
      { name: 'row_num', description: 'The row number in the array from which to return a value.', required: true, type: 'Number' },
      { name: 'column_num', description: 'Optional. The column number in the array from which to return a value.', required: false, type: 'Number' },
    ],
    returns: { type: 'Any', description: 'The value of the specified cell.' },
    examples: [
      {
        description: 'Get the value from the 2nd row and 3rd column of a range.',
        formula: '=INDEX(A1:C3, 2, 3)',
        result: 'F',
        data: { headers: ['Col1', 'Col2', 'Col3'], rows: [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']] },
      },
    ],
    commonErrors: [
      { error: '#REF!', description: 'Occurs if row_num or column_num is outside the bounds of the array.' },
    ],
    pitfalls: ['If `row_num` or `column_num` is set to 0, INDEX returns the values for the entire column or row, respectively (in dynamic array Excel).'],
    notes: ['Often combined with the MATCH function to create powerful and flexible lookups (the "INDEX/MATCH" pattern).'],
    versionIntroduced: 'Excel 2000',
    tags: ['lookup', 'retrieve', 'position'],
    difficulty: 'Intermediate',
    relatedFunctions: ['MATCH', 'XLOOKUP', 'OFFSET'],
  },
  {
    name: 'MATCH',
    category: 'Lookup & Reference',
    shortDescription: 'Searches for an item in a range of cells, and then returns the relative position of that item in the range.',
    syntax: 'MATCH(lookup_value, lookup_array, [match_type])',
    arguments: [
      { name: 'lookup_value', description: 'The value that you want to match in lookup_array.', required: true, type: 'Any' },
      { name: 'lookup_array', description: 'The range of cells being searched.', required: true, type: 'Range' },
      { name: 'match_type', description: 'Optional. The number -1, 0, or 1. 0=Exact Match, 1=Less Than (requires sorted asc), -1=Greater Than (requires sorted desc).', required: false, type: 'Number' },
    ],
    returns: { type: 'Number', description: 'The relative position (as a number) of the matched item.' },
    examples: [
      {
        description: 'Find the position of "Banana" in a list.',
        formula: '=MATCH("Banana", A1:A3, 0)',
        result: '2',
        data: { headers: ['Product'], rows: [['Apple'], ['Banana'], ['Cherry']] },
      },
    ],
    commonErrors: [
      { error: '#N/A', description: 'Occurs if a match for lookup_value is not found.' },
    ],
    pitfalls: ['For an exact match, which is the most common use case, always set `match_type` to 0.'],
    notes: ['MATCH is the ideal partner for INDEX. MATCH finds the position, and INDEX retrieves the value at that position.'],
    versionIntroduced: 'Excel 2000',
    tags: ['lookup', 'position', 'find'],
    difficulty: 'Intermediate',
    relatedFunctions: ['INDEX', 'XLOOKUP', 'XMATCH'],
  },
  // ... (Many more functions to be added here following the same structure)
  {
    name: 'TEXT',
    category: 'Text',
    shortDescription: 'Converts a value to text in a specific number format.',
    syntax: 'TEXT(value, format_text)',
    arguments: [
        { name: 'value', description: 'The numeric value you want to convert to text.', required: true, type: 'Number/Date' },
        { name: 'format_text', description: 'A text string that defines the formatting.', required: true, type: 'String' },
    ],
    returns: { type: 'String', description: 'The value formatted as text.' },
    examples: [
      {
        description: 'Format a date as "Day, Month DD, YYYY".',
        formula: '=TEXT("2024-07-26", "dddd, mmmm dd, yyyy")',
        result: '"Friday, July 26, 2024"',
      },
      {
        description: 'Format a number as currency.',
        formula: '=TEXT(1234.56, "$#,##0.00")',
        result: '"$1,234.56"',
      }
    ],
    commonErrors: [],
    pitfalls: ['The result of the TEXT function is always a text string, even if it looks like a number. This means you cannot use it directly in mathematical calculations.'],
    notes: ['Provides extensive control over how numbers and dates are displayed as text.'],
    versionIntroduced: 'Excel 2000',
    tags: ['text', 'formatting', 'date', 'number'],
    difficulty: 'Intermediate',
    relatedFunctions: ['CONCAT', 'VALUE', 'DOLLAR'],
  },
  {
    name: 'CONCAT',
    category: 'Text',
    shortDescription: 'Combines the text from multiple ranges and/or strings.',
    syntax: 'CONCAT(text1, [text2], ...)',
    arguments: [
        { name: 'text1', description: 'The first text item to join.', required: true, type: 'String/Range' },
        { name: 'text2', description: 'Optional. Additional text items to join.', required: false, type: 'String/Range' },
    ],
    returns: { type: 'String', description: 'A single text string containing the combined items.' },
    examples: [
        {
            description: 'Join a first name and last name with a space.',
            formula: '=CONCAT(A1, " ", B1)',
            result: '"John Smith"',
            data: { headers: ['First', 'Last'], rows: [['John', 'Smith']] }
        }
    ],
    commonErrors: [],
    pitfalls: ['CONCAT does not provide a delimiter. You must add spaces or other separators manually between arguments.'],
    notes: ['CONCAT is the modern replacement for the older CONCATENATE function. For more control, use TEXTJOIN.'],
    versionIntroduced: 'Excel 2019 / O365',
    tags: ['text', 'join', 'combine', 'string'],
    difficulty: 'Beginner',
    relatedFunctions: ['TEXTJOIN', 'CONCATENATE', '& (ampersand operator)'],
  },
  {
    name: 'TEXTJOIN',
    category: 'Text',
    shortDescription: 'Combines the text from multiple ranges and/or strings, with a delimiter.',
    syntax: 'TEXTJOIN(delimiter, ignore_empty, text1, [text2], ...)',
    arguments: [
        { name: 'delimiter', description: 'A text string to be inserted between each text item.', required: true, type: 'String' },
        { name: 'ignore_empty', description: 'If TRUE, empty cells are ignored.', required: true, type: 'Boolean' },
        { name: 'text1', description: 'The first text item or range to join.', required: true, type: 'String/Range' },
        { name: 'text2', description: 'Optional. Additional text items.', required: false, type: 'String/Range' },
    ],
    returns: { type: 'String', description: 'The combined text string.' },
    examples: [
        {
            description: 'Join a range of cells with a comma and space, ignoring any blanks.',
            formula: '=TEXTJOIN(", ", TRUE, A1:A4)',
            result: '"Red, Blue, Green"',
            data: { headers: ['Colors'], rows: [['Red'], ['Blue'], [''], ['Green']] }
        }
    ],
    commonErrors: [],
    pitfalls: [],
    notes: ['Extremely useful for creating comma-separated lists or combining text from a range dynamically.'],
    versionIntroduced: 'Excel 2019 / O365',
    tags: ['text', 'join', 'combine', 'delimiter', 'list'],
    difficulty: 'Intermediate',
    relatedFunctions: ['CONCAT', 'TEXTSPLIT'],
  },
  {
    name: 'FILTER',
    category: 'Dynamic Array',
    shortDescription: 'Filters a range of data based on supplied criteria.',
    syntax: 'FILTER(array, include, [if_empty])',
    arguments: [
        { name: 'array', description: 'The array or range to filter.', required: true, type: 'Range' },
        { name: 'include', description: 'A boolean array whose height or width is the same as the array.', required: true, type: 'Range/Logical Expression' },
        { name: 'if_empty', description: 'Optional. The value to return if no items are returned.', required: false, type: 'Any' },
    ],
    returns: { type: 'Array', description: 'An array of values that meet the criteria.' },
    examples: [
        {
            description: 'Filter a list of products to show only those in the "Fruit" category.',
            formula: '=FILTER(A2:B5, A2:A5="Fruit", "No Results")',
            result: '{"Apple", 150; "Banana", 200}', // Represents a spilled array
            data: { headers: ['Category', 'Sales'], rows: [['Fruit', 'Apple', 150], ['Vegetable', 'Carrot', 80], ['Fruit', 'Banana', 200], ['Vegetable', 'Broccoli', 120]] }
        }
    ],
    commonErrors: [
        { error: '#CALC!', description: 'Occurs when no results are found and the `if_empty` argument is not provided.' },
        { error: '#VALUE!', description: 'Occurs if the `include` argument is not a boolean array of the correct size.' }
    ],
    pitfalls: ['The result is a dynamic array that will "spill" into adjacent cells. Ensure there is enough empty space for the results.'],
    notes: ['One of the most powerful new dynamic array functions for creating dynamic reports.'],
    versionIntroduced: 'Excel 2021 / O365',
    tags: ['dynamic array', 'filter', 'extract', 'criteria'],
    difficulty: 'Intermediate',
    relatedFunctions: ['SORT', 'UNIQUE', 'XLOOKUP'],
  },
  {
    name: 'SORT',
    category: 'Dynamic Array',
    shortDescription: 'Sorts the contents of a range or array.',
    syntax: 'SORT(array, [sort_index], [sort_order], [by_col])',
    arguments: [
        { name: 'array', description: 'The range or array to sort.', required: true, type: 'Range' },
        { name: 'sort_index', description: 'Optional. The row or column number to sort by. Defaults to 1.', required: false, type: 'Number' },
        { name: 'sort_order', description: 'Optional. 1 for ascending (default), -1 for descending.', required: false, type: 'Number' },
        { name: 'by_col', description: 'Optional. FALSE to sort by row (default), TRUE to sort by column.', required: false, type: 'Boolean' },
    ],
    returns: { type: 'Array', description: 'A sorted array of values.' },
    examples: [
        {
            description: 'Sort a list of names alphabetically.',
            formula: '=SORT(A1:A3)',
            result: '{"Alice"; "Bob"; "Charlie"}',
            data: { headers: ['Name'], rows: [['Charlie'], ['Alice'], ['Bob']] }
        },
        {
            description: 'Sort a table of products by price in descending order.',
            formula: '=SORT(A1:B3, 2, -1)',
            result: '{"Laptop", 1200; "Mouse", 25; "Keyboard", 75}',
            data: { headers: ['Product', 'Price'], rows: [['Mouse', 25], ['Keyboard', 75], ['Laptop', 1200]] }
        }
    ],
    commonErrors: [],
    pitfalls: ['Like other dynamic array functions, requires empty cells for the results to spill into.'],
    notes: ['Use SORTBY for more complex sorting based on columns that are not part of the output array.'],
    versionIntroduced: 'Excel 2021 / O365',
    tags: ['dynamic array', 'sort', 'order', 'alphabetical'],
    difficulty: 'Intermediate',
    relatedFunctions: ['SORTBY', 'FILTER', 'UNIQUE'],
  },
  {
    name: 'UNIQUE',
    category: 'Dynamic Array',
    shortDescription: 'Returns a list of unique values in a list or range.',
    syntax: 'UNIQUE(array, [by_col], [exactly_once])',
    arguments: [
        { name: 'array', description: 'The range or array from which to extract unique values.', required: true, type: 'Range' },
        { name: 'by_col', description: 'Optional. FALSE to compare by row (default), TRUE to compare by column.', required: false, type: 'Boolean' },
        { name: 'exactly_once', description: 'Optional. FALSE for all unique items (default), TRUE for items that appear only once.', required: false, type: 'Boolean' },
    ],
    returns: { type: 'Array', description: 'An array of unique values.' },
    examples: [
        {
            description: 'Get a unique list of products from a sales list.',
            formula: '=UNIQUE(A1:A5)',
            result: '{"Apple"; "Orange"; "Banana"}',
            data: { headers: ['Product'], rows: [['Apple'], ['Orange'], ['Apple'], ['Banana'], ['Orange']] }
        }
    ],
    commonErrors: [],
    pitfalls: [],
    notes: ['A simple and powerful way to deduplicate lists, a task that was previously complex.'],
    versionIntroduced: 'Excel 2021 / O365',
    tags: ['dynamic array', 'unique', 'distinct', 'deduplicate'],
    difficulty: 'Intermediate',
    relatedFunctions: ['FILTER', 'SORT', 'COUNTA'],
  },
   {
    name: 'LET',
    category: 'Dynamic Array',
    shortDescription: 'Assigns names to calculation results, allowing you to store intermediate calculations or values inside a formula.',
    syntax: 'LET(name1, name_value1, [name2, name_value2], ..., calculation)',
    arguments: [
      { name: 'name1', description: 'The first name to assign.', required: true, type: 'String' },
      { name: 'name_value1', description: 'The value or calculation to assign to name1.', required: true, type: 'Any' },
      { name: 'calculation', description: 'The final calculation that uses the defined names.', required: true, type: 'Expression' },
    ],
    returns: { type: 'Any', description: 'The result of the final calculation expression.' },
    examples: [
      {
        description: 'Define a variable for filtered data to avoid repetition.',
        formula: '=LET(filtered_sales, FILTER(Sales, Sales>100), AVERAGE(filtered_sales))',
        result: 'The average of sales > 100.',
      },
    ],
    commonErrors: [],
    pitfalls: ['Name definitions must come in pairs before the final calculation.'],
    notes: ['Improves readability and performance of complex formulas by calculating an intermediate result only once and reusing it.'],
    versionIntroduced: 'Excel 2021 / O365',
    tags: ['dynamic array', 'lambda', 'variable', 'performance', 'readability'],
    difficulty: 'Advanced',
    relatedFunctions: ['LAMBDA'],
  },
  {
    name: 'LAMBDA',
    category: 'Dynamic Array',
    shortDescription: 'Creates a custom, reusable function that can be called by a friendly name.',
    syntax: 'LAMBDA([parameter1, ...], calculation)',
    arguments: [
      { name: 'parameter1', description: 'Optional. A parameter to pass to the function, like a cell reference or value.', required: false, type: 'Any' },
      { name: 'calculation', description: 'The formula you want to execute and return as the result of the function.', required: true, type: 'Expression' },
    ],
    returns: { type: 'Function', description: 'A lambda function that can be called or defined in the Name Manager.' },
    examples: [
      {
        description: 'Create a simple function to add a percentage, then call it.',
        formula: '=LAMBDA(x, p, x * (1+p))(100, 0.05)',
        result: '105',
      },
      {
        description: 'Define `ADD_VAT` in Name Manager with formula =LAMBDA(price, price * 1.2). Then in a cell: =ADD_VAT(A1)',
        // FIX: Add missing 'formula' property to satisfy the Example type.
        formula: '=ADD_VAT(A1)',
        result: 'The value in A1 increased by 20%.',
      }
    ],
    commonErrors: [],
    pitfalls: ['A LAMBDA function must be defined in the Name Manager to be truly reusable by a friendly name.'],
    notes: ['LAMBDA enables the creation of powerful custom functions without using VBA or Office Scripts. It is the foundation for advanced helper functions like MAP and REDUCE.'],
    versionIntroduced: 'Excel 2021 / O365',
    tags: ['dynamic array', 'lambda', 'custom function', 'programming'],
    difficulty: 'Advanced',
    relatedFunctions: ['LET', 'MAP', 'REDUCE', 'SCAN'],
  },
  // Add 100+ more functions...
];