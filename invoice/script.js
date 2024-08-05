const tBody = document.getElementById("table-body");

addNewRow =()=> {
    const row = document.createElement("tr");
    row.className = "single-row";
    row.innerHTML = `<td><input type="text" placeholder="Product name" class="product" id="product"></td>
                    <td><input type="number" placeholder="0" name="unit" class="unit" id="unit" onkeyup="getInput()"></td>
                    <td><input type="number" placeholder="0" name="price" class="price" id="price" onkeyup="getInput()"></td>
                    <td><input type="number" placeholder="0" name="amount" class="amount" id="amount" disabled></td>
                    <td style="text-align: right;"><span class="material-icons" action="delete">delete_outline</span></td>`

    tBody.insertBefore(row, tBody.lastElementChild.previousSibling);
}

document.getElementById("add-row").addEventListener("click", (e)=> {
    e.preventDefault();
    addNewRow();
});



// Define the key for localStorage
const invoiceKey = 'invoiceNumber';

// Get the current invoice number from localStorage, or use a default value
let invoiceNumber = localStorage.getItem(invoiceKey);
if (!invoiceNumber) {
    invoiceNumber = 12344; // Default starting invoice number
} else {
    invoiceNumber = parseInt(invoiceNumber, 10); // Convert the stored string to a number
}

// Increment the invoice number by 1
invoiceNumber += 1;

// Update the displayed invoice number
document.getElementById('invoiceNumber').innerText = invoiceNumber;

// Save the new invoice number back to localStorage
localStorage.setItem(invoiceKey, invoiceNumber);





//GET INPUTS, MULTIPLY AND GET THE ITEM PRICE
getInput =()=> {
    var rows = document.querySelectorAll("tr.single-row");
    rows.forEach((currentRow) => {
        var unit = currentRow.querySelector("#unit").value;
        var price = currentRow.querySelector("#price").value;

        amount = unit * price;
        currentRow.querySelector("#amount").value = amount;
        overallSum();

    })
};

//Get the overall sum/Total
overallSum =()=> {
    var arr = document.getElementsByName("amount");
    var total = 0;
    for(var i = 0; i < arr.length; i++) {
        if(arr[i].value) {
            total += +arr[i].value;
        }
        document.getElementById("total").value = total;
    }
}

//Delete row from the table
tBody.addEventListener("click", (e)=>{
    let el = e.target;
    const deleteROW = e.target.getAttribute("action");
    if(deleteROW == "delete") {
        delRow(el);
        overallSum();
    }
})

//Target row and remove from DOM;
delRow =(el)=> {
    el.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode);
}

document.querySelector(".printt").addEventListener("click",()=>{
    document.querySelector(".print-button").innerHTML = ``;
    setTimeout(() => {
        window.print();
    }, 100);
})