  function loadCart(){
    for(var item in cart){
        let node = cart[item];
        let netPrice=cart[item].price;
        console.log(node);
        let row = `<li id="${cart[item].type}"><div class="row" onclick="showSuggestions('${cart[item].type}','${item}');"><span  class="col s3">${cart[item].brand}</span><span  class="col s3"><input onchange='netPrice=(${node.price}*this.value); getElementById("netPrice${node.brand}").innerHTML = netPrice; calcTotal();' value="1" type="number"></span><span class="col s3">${node.price}</span><span class="col s3" id="netPrice${node.brand}">${netPrice}</span></div></li>`
        $(row).appendTo(document.getElementById("item_table"));
    }
}
function calcTotal(){
    var total = 0;
    for(var item in cart){
        total = total +parseInt(document.getElementById("netPrice"+cart[item].brand).innerHTML);
    }
    let row = `Total : Rs. ${total}`;
    document.getElementById("total").innerHTML = row;
}
function showSuggestions(item,index){
    var active = null;
    var parent = null;
    products.forEach(element =>{
        parent = document.getElementById(element.type);
        if(element.type == item && parent.getAttribute("class")!="active"){
           let row =  `<div class="suggestion-row" onclick="swapItem(${products.indexOf(element)},${index});document.getElementById('${element.type}').setAttribute('class','');"><div class="row"> Brand :${element.brand}  Price:${element.price}</div></div>`;
           $(row).appendTo(parent);
           active = parent;
        }
    })
    active.setAttribute("class","active");
}
function swapItem(element,index){
    let netPrice=products[element].price;
    cart[index] = products[element];
    document.getElementById(products[element].type).innerHTML = `<div class="row" onclick="showSuggestions('${products[element].type}','${index}');"><span  class="col s3">${products[element].brand}</span><span  class="col s3"><input onchange='netPrice=(${products[element].price}*this.value); getElementById("netPrice${products[element].brand}").innerHTML = netPrice; calcTotal();' value="1" type="number"></span><span class="col s3">${products[element].price}</span><span class="col s3" id="netPrice${products[element].brand}">${netPrice}</span></div>`;
    calcTotal();
}