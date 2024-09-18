document.getElementById("form-expense").addEventListener("submit", function(e) {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const comment = document.getElementById("comment").value;

  const expense = {date, amount, category, comment};

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  displayExpenses();
  document.getElementById("form-expense").reset();
});

function displayExpenses() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const expenseList = document.getElementById("expense-list");
  expenseList.innerHTML = '';

  expenses.forEach((expense, index) => {
      const [year, month, day] = expense.date.split('-');
      const listItem = document.createElement("li");

      listItem.className = "list-group-item";
      listItem.innerHTML = `
        <strong>#</strong>${index + 1},
        <strong>Date:</strong> ${year}.${month}.${day},
        <strong>Amount:</strong> $${expense.amount},
        <strong>Category:</strong> ${expense.category}`
      if (expense.comment.length >= 1) {
        listItem.innerHTML += `, <strong>Comment:</strong> ${expense.comment}`;
      }

      expenseList.appendChild(listItem);
  });
}

window.onload = displayExpenses;
