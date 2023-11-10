// Retrieving HTML elements by their IDs
let list = document.getElementById('list')
let elist = document.getElementById('elist')
let tlist = document.getElementById('tlist')
let listItem = document.createElement('li')
let incenter = document.getElementById('incenter')
let expenter = document.getElementById('expenter')
let income = document.getElementById('income')
let expenses = document.getElementById('expenses')
let addIncome = document.getElementById('addIncome')
let closeincomePopup = document.getElementById('closeincomePopup')
let totIncome = document.getElementById('totIncome')
let addExpense = document.getElementById('addExpense')
let closeexpensePopup = document.getElementById('closeexpensePopup')
let grossInc = document.getElementById('grossInc')
let grossExp = document.getElementById('grossExp')
let incomeDecription = document.getElementById('incomeDecription')
let expenseDecription = document.getElementById('expenseDecription')
let weekBudget = document.getElementById('weekBudget')
let calcBudget = document.getElementById('calcBudget')

// Event listeners for showing and hiding the income and expense popups
addIncome.addEventListener("click", function () {
    incomePopup.classList.add("show");
});
closeincomePopup.addEventListener("click", function () {
    incomePopup.classList.remove("show");
});
window.addEventListener("click", function (event) {
    if (event.target == incomePopup) {
        incomePopup.classList.remove("show");
    }
});

addExpense.addEventListener("click", function () {
    expensePopup.classList.add("show");
});
closeexpensePopup.addEventListener("click", function () {
    expensePopup.classList.remove("show");
});
window.addEventListener("click", function (event) {
    if (event.target == expensePopup) {
        expensePopup.classList.remove("show");
    }
});

// Initializing and setting initial values
grossInc.value = 0
grossExp.value = 0
let nowIncome = 0

// Budget class for managing income, expenses, and calculations
class Budget {
    constructor(totIncome) {
        this.totIncome = totIncome
        this.grossInc = grossInc.value
    }

    // Method to add income
    addIncomes() {
        let incomeAmount = parseFloat(income.value);
        nowIncome +=  incomeAmount
        this.totIncome = nowIncome
        totIncome.value = this.totIncome
    }

    // Method to add expenses
    addExpenses() {
        let expenseAmount = parseFloat(expenses.value);
        nowIncome = totIncome.value
        let theIncome = nowIncome - expenseAmount
        this.totIncome = theIncome
        totIncome.value = this.totIncome
    }

    // Method to update the list of total income
    updateTotListIncome() {
        let incomeDec = incomeDecription.value
        let nowIncome = income.value
        let listDecription = document.createElement('li')
        let IncomeText = document.createTextNode(nowIncome.toLocaleString('en'))
        let descriptionText = document.createTextNode(incomeDec + '   +$')
        listDecription.appendChild(descriptionText) 
        listDecription.appendChild(IncomeText)
        tlist.appendChild(listDecription)
    }

    // Method to update the list of total expenses
    updateTotListExpense() {
        let expenseDec = expenseDecription.value
        let nowIncome = expenses.value
        let listDecription = document.createElement('li')
        let expenseText = document.createTextNode(nowIncome)
        let descriptionText = document.createTextNode(expenseDec + '   -$')
        listDecription.appendChild(descriptionText) 
        listDecription.appendChild(expenseText)
        tlist.appendChild(listDecription)
    }

    // Method to calculate and display the recommended weekly budget
    calculateWeekBudget() {
        nowIncome = totIncome.value
        let weekbud = nowIncome / 4
        let week = weekbud.toLocaleString('en')
        weekBudget.innerHTML = `Your recommended weekly budget is $${week}`
    }
}

// Creating an instance of the Budget class
let bud = new Budget(totIncome)

// Event listeners for adding income, expenses, and calculating the weekly budget
incenter.addEventListener('click', ()=>{
    let listItem = document.createElement('li')
    namer = '+ $' + income.value
    bud.addIncomes()
    let listText = document.createTextNode(namer)
    listItem.appendChild(listText)
    list.appendChild(listItem)
    bud.updateTotListIncome()
    grossInc.value = parseFloat(grossInc.value) + parseFloat(income.value);
    income.value = undefined
    incomeDecription.value = ''
})

expenter.addEventListener('click', ()=>{
    let listItem = document.createElement('li')
    namer = '- $' + expenses.value
    bud.addExpenses()
    bud.updateTotListExpense()
    let listText = document.createTextNode(namer)
    listItem.appendChild(listText)
    elist.appendChild(listItem)
    grossExp.value = parseFloat(grossExp.value) + parseFloat(expenses.value);
    expenses.value = 0
})

calcBudget.addEventListener('click', ()=>{
   bud.calculateWeekBudget()
})