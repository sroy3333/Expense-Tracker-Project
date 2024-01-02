document.addEventListener('DOMContentLoaded', function () {
    // Load expenses from localStorage on page load
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    storedExpenses.forEach(expense => addExpenseToList(expense));
  });
  
  function handleExpenseSubmit(event) {
    event.preventDefault();
  
    // Get expense values
    const amount = document.getElementById('expenseAmount').value;
    const description = document.getElementById('expenseDescription').value;
    const category = document.getElementById('expenseCategory').value;
  
    // Create expense object
    const expense = {
      amount,
      description,
      category
    };
  
    // Add expense to the list
    addExpenseToList(expense);
  
    // Clear form fields
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseDescription').value = '';
    document.getElementById('expenseCategory').value = '';
  
    // Save expense to local storage
    saveExpenseToLocalStorage(expense);
}
  
  // Function to add expense to the list
  function addExpenseToList(expense) {
    // Create li element
    const li = document.createElement('li');
    li.classList.add('list-group-item');
  
    // Create text node with expense details
    const textNode = document.createTextNode(
      `Amount: ${expense.amount}, Description: ${expense.description}, Category: ${expense.category}`
    );
  
    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Expense';
    deleteButton.classList.add('btn', 'btn-danger', 'ml-2');
    deleteButton.onclick = function () {
      // Remove li element from the screen and local storage
      li.remove();
      removeExpenseFromLocalStorage(expense);
    };
  
    // Create edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit Expense';
    editButton.classList.add('btn', 'btn-warning', 'ml-2');
    editButton.onclick = function () {
      // Populate form fields with existing values
      document.getElementById('expenseAmount').value = expense.amount;
      document.getElementById('expenseDescription').value = expense.description;
      document.getElementById('expenseCategory').value = expense.category;
  
      // Remove expense details from the screen and local storage
      li.remove();
      removeExpenseFromLocalStorage(expense);
    };
  
    // Append text node, delete button, and edit button to li
    li.appendChild(textNode);
    li.appendChild(deleteButton);
    li.appendChild(editButton);
  
    // Append li to the expense list
    document.getElementById('expenseList').appendChild(li);
}
  
  // Function to save expense to local storage
  function saveExpenseToLocalStorage(expense) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}
  
  // Function to remove expense from local storage
  function removeExpenseFromLocalStorage(expense) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(e => e.amount !== expense.amount);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}