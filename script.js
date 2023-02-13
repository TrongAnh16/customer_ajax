class Customer {

    constructor(id, name, email, phone, address) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }

}
let listCustomer = [];
let currentCustomer;

function setCurrentCustomer(id) {
    for (let i = 0; i < listCustomer.length; i++) {
        if (id == listCustomer[i].id) {
           currentCustomer = listCustomer[i];
           break;
        }
    }
}

function appendCustomerInfor(currentCustomer) {
    $("#ename").val(currentCustomer.name);
    $("#eemail").val(currentCustomer.email);
    $("#ephone").val(currentCustomer.phone);
    $("#eaddress").val(currentCustomer.address);
}

function appendDeleteCustomerInfor(currentCustomer) {
    $("#dname").val(currentCustomer.name);
    $("#demail").val(currentCustomer.email);
    $("#dphone").val(currentCustomer.phone);
    $("#daddress").val(currentCustomer.address);
}

function generateId() { let id = 0;
 listCustomer.forEach(function(customer) {
        if (customer.id > id) {
            id = customer.id;
        }
    })
    return id + 1;
}

$("#add").click(add)
function  add(e)
{
    let id = generateId();
    let name = $("#name").val();
    let email = $("#email").val();
    let phone = $("#phone").val();
    let address = $("#address").val();

  let customer = new Customer(id, name, email, phone, address);
  listCustomer.push(customer);
  console.log(listCustomer);
  render(listCustomer);
  e.preventDefault();
  document.querySelector("form").reset();
}

$("#save").click(save)
function save(e)
{
    e.preventDefault();
    currentCustomer.name = $("#ename").val();
    currentCustomer.email = $("#eemail").val();
    currentCustomer.phone = $("#ephone").val();
    currentCustomer.address = $("#eaddress").val();

    for (let i = 0; i < listCustomer.length; i++) {
        if (currentCustomer.id == listCustomer[i].id) {
            listCustomer[i].name = currentCustomer.name;
            listCustomer[i].email = currentCustomer.email;
            listCustomer[i].phone = currentCustomer.phone;
            listCustomer[i].address = currentCustomer.address;
            break;
        }
    }
    render(listCustomer);
}

$("#delete").click(remove)
function remove(e) 
{
    e.preventDefault();
    currentCustomer.name = $("#dname").val();
    currentCustomer.email = $("#demail").val();
    currentCustomer.phone = $("#dphone").val();
    currentCustomer.address = $("#daddress").val();
    for (let i = 0; i < listCustomer.length; i++) {
        if (currentCustomer.id == listCustomer[i].id) {
            listCustomer[i].name = currentCustomer.name;
            listCustomer[i].email = currentCustomer.email;
            listCustomer[i].phone = currentCustomer.phone;
            listCustomer[i].address = currentCustomer.address;
            listCustomer.splice(i, 1);
            break;
        }
    }
    render(listCustomer);
}



function handleEditCustomer(element) {
    setCurrentCustomer(element.dataset.customerid);

    appendCustomerInfor(currentCustomer);
}

function handleDeleteCustomer(element) {
    setCurrentCustomer(element.dataset.customerid);

    appendDeleteCustomerInfor(currentCustomer);
}

function render(listCustomer) {
  let htmls =  listCustomer.map(function(customer) {
        return `
            <tr>
                <td>
                    <span class="custom-checkbox">
                        <input type="checkbox" id="checkbox4" name="options[]" value="1">
                        <label for="checkbox4"></label>
                    </span>
                </td>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>${customer.address}</td>
                <td>
                    <a href="#editEmployeeModal" class="edit" data-toggle="modal" data-customerId=${customer.id} onclick = "handleEditCustomer(this)"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                    <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" data-customerId=${customer.id} onclick = "handleDeleteCustomer(this)"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                </td>
            </tr>					`
        })
    $("#tbody").empty().append(htmls.join("")); 
}
