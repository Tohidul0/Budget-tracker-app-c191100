
const addExpenseButton = document.getElementById("add-expense-button");

const descriptionInput = document.getElementById("description");
const valueInput = document.getElementById("value");
const selectInput = document.getElementById("type");

const incomeList = document.getElementById("income-list");
const expenseList = document.getElementById("expense-list");
const totalIncome = document.getElementById("total-income");
// -----------------total expense add---
const totalExpence = document.getElementById('total-expence')

//------available amount add------------------
const availableBudget = document.getElementById('available-amount')

// global variable;
let newEntryHtml;
let income;
let cost;
//let storeData={};
let id = 0;
let lii;
let m=0;
let totalbudget;

function formatMoney(value) {
  return Math.abs(Number(value)).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
}


//totalIncome start here-----------------------------------------------------------
function calculateIncome() {
  let sum = 0;
  for (let item of incomeList.children) {
    const valueString =
      item.children[0].children[1].children[0].innerHTML.replace(/,/g, "");

    console.log(parseFloat(valueString));
    sum += parseFloat(valueString);
  }
  income=sum;
  totalIncome.innerHTML = formatMoney(sum);
}
//totalIncome finished here----------------------------------------------------------------
//calculateIncome();





// totalExpence start here-------------------------------------------------------------------------------
function calculateExpense() {
  let summe = 0;
  for (let item of expenseList.children) {
    const valueStringEx =
      item.children[0].children[1].children[0].innerHTML.replace(/,/g, "");
   //console.log(valueStringEx)
    //console.log(parseFloat(valueStringEx));
    summe += parseFloat(valueStringEx);

  }
  console.log(summe)
  cost=Math.abs(summe);
 
  totalExpence.innerHTML = formatMoney(summe);

}
// totalExpense finished here--------------------------------------------------------------------------




// avaiable budget start here------------------------------------------------------------------
function calculateBudget(){
  console.log(cost);
  console.log(income);
  totalbudget=income-cost;
  availableBudget.innerHTML=formatMoney(totalbudget);

}



/**
 * Task 3: Delete Entry------------------------------------------------------
 */
function deleteEntry( id, val, si) {
  localStorage.setItem(id, val);
  console.log(si);
  
  if(si==='+'){
    income=income-val;
    //console.log(income)
    //calculateIncome();
    totalIncome.innerHTML = formatMoney(income);
    console.log(id, val);
    let g;
    g="delete"+id;
    console.log(g);
    const deleteHtml= document.getElementById(g)
    deleteHtml.style.display="none";
  
  
  
    // const newEntryHtml1=` document.getElementById("delete${id}").style.display: "none"`
    // lii.innerHTML += newEntryHtml1;
  
  
  
    totalbudget = totalbudget-val;
    availableBudget.innerHTML=formatMoney(totalbudget);
  }
  else{
    cost=cost-val;
    //console.log(income)
    //calculateIncome();
    totalExpence.innerHTML = formatMoney(cost);
    console.log(id, val);
    let g;
    g="delete"+id;
    console.log(g);
    const deleteHtml= document.getElementById(g)
    deleteHtml.style.display="none";
  
  
  
    // const newEntryHtml1=` document.getElementById("delete${id}").style.display: "none"`
    // lii.innerHTML += newEntryHtml1;
  
  
  
    totalbudget = totalbudget+val;
    availableBudget.innerHTML=formatMoney(totalbudget);
  }
  
 
 
}

function addEntry() {
  const type = selectInput.value;
  const description = descriptionInput.value;
  const value = valueInput.value;

  // data validation
  const errors = [];
  if (description.length === 0) {
    errors.push("Please enter the description");
  }
  if (value.length === 0) {
    errors.push("Please enter the value");
  }
  if (errors.length > 0) {
    alert(errors);
    return;
  }

  // insert entry
  const list = type === "income" ? incomeList : expenseList;
  lii=list
  const sign = type === "income" ? "+" : "-";
  const colorClass = type === "income" ? "text-green-600" : "text-red-600";
 
  // if(type === "income"){
  //   id=id+1;
  // }
  // else{
  //   id+2;
  // }

  id++;
 
   m=0;
   newEntryHtml = `
    <li class="py-2.5" id="delete${id}" >
      <div class="group flex justify-between gap-2 text-sm">
        <span>${description}</span>
        <div>
          <span class="${colorClass}">${sign}${formatMoney(value)}</span>
          <span
            class="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block"
            onclick="deleteEntry(${id}, ${value}, '${sign}')"
          >
            Delete
          </span>
         
        </div>
      </div>
    </li>
    `;

  // Approach 1:
  if(m>0){
    newEntryHtml='';
  }
  list.innerHTML += newEntryHtml;

  // update total income value
  calculateIncome();

  /**
 * Task 1: Calculate total expense-------------------done-------
 */
  calculateExpense();

  /**
 * Task 2: Calculate the budget-------------------------done---------
 */
 calculateBudget() ;
  
}

addExpenseButton.addEventListener("click", addEntry);
