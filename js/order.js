"use strict";

$('#pizza-size').change(function(){
    if($(this).val() == "sm"){
        $("#crust-choice option[value='deep']").prop('hidden',true);
    }
    else $("#crust-choice option[value='deep']").prop('hidden',false);
});

$('#crust-choice').change(function(){
    if($(this).val() == "deep"){
        $("#pizza-size option[value='sm']").prop('hidden',true);
    }
    else $("#pizza-size option[value='sm']").prop('hidden',false);
});

$('#pizza-size').change(function(){
    if($('#pizza-size').val() == "sm") {
        $("#alert").show();
    }
    else $("#alert").hide();
});

$('.pizza-updater').change(function () {
    var key = $(this).attr('id');
    var value = $(this).val();
    localStorage.setItem(key, value)
});

$('.form-control').each(function () {
    var key = $(this).attr('id');
    if (localStorage.getItem(key)) {
        $(this).val(localStorage.getItem(key));
        $("#crust-choice-container").removeClass("hidden");
        $(".toppings-container").removeClass("hidden");
        $(".total-price").removeClass("hidden");
        if($('#pizza-size').val() == "sm") {
            $("#alert").show();
        }
        else $("#alert").hide();
    }
});


$(document).ready(function($){
    var pizzaOrder = getOrder();

    $("#pizza-size").on("change", function(e){
        $("#crust-choice-container").removeClass("hidden");
    });

    $("#crust-choice").on("change", function(e){
        $(".toppings-container").removeClass("hidden");
    });

    $("#crust-choice").on("change", function(e){
        $(".total-price").removeClass("hidden");
    });

    $(".pizza-updater").on("change", function(e){
        var fieldName = $(this).attr('name');
        pizzaOrder[fieldName] = $(this).val();
        saveOrder(pizzaOrder);
    });

    // REVIEWED TO SITE BELOW TO DETERMINE HOW TO SAVE AND RELOAD MULITPLE CHECKBOX SELECTIONS
    // https://stackoverflow.com/questions/34831745/how-to-save-multiple-checkbox-values-to-local-storage

    $('.pizza-updater').on('click', function() {
        var topping, toppings = [];
        $('.form-check-input').each(function() { // run through each of the checkboxes
            topping = {id: $(this).attr('id'), value: $(this).prop('checked')};
            toppings.push(topping);
        });
        localStorage.setItem("pizzatoppings", JSON.stringify(toppings));
    });

    $(document).ready(function() {
        var pizzatoppings = JSON.parse(localStorage.getItem('pizzatoppings'));
        if (!pizzatoppings.length) {return};

        for (var i=0; i<pizzatoppings.length; i++) {
            $('#' + pizzatoppings[i].id ).prop('checked', pizzatoppings[i].value);
        }
    });

    $('#body').ready(function(){
        calculateTotal();
    });

});


var pizza_sizes_prices = new Array(); {
    pizza_sizes_prices["sm"] = 8.99;
    pizza_sizes_prices["md"] = 12.99;
    pizza_sizes_prices["lg"] = 15.99;
}

var crust_choices_prices = new Array(); {
    crust_choices_prices["thin"] = 0.00;
    crust_choices_prices["deep"] = 2.00;
}

function getPizzaSizePrice()
{
    var pizzaSizePrice=0.00;

    var orderForm = document.forms["order-form"];

    var selectedPizzaSize = orderForm.elements["pizza-size"];

    pizzaSizePrice = pizza_sizes_prices[selectedPizzaSize.value];

    return pizzaSizePrice;
}

function getPizzaCrustPrice()
{
    var pizzaCrustPrice=0.00;

    var orderForm = document.forms["order-form"];

    var selectedPizzaCrust = orderForm.elements["crust-choice"];

    pizzaCrustPrice = crust_choices_prices[selectedPizzaCrust.value];

    return pizzaCrustPrice;
}

function getToppingsPrice()
{
    var pizzaToppingsPrice=0.00;
    var pizzaToppingsPepperoniPrice=0.00;
    var pizzaToppingsSausagePrice=0.00;
    var pizzaToppingsBaconPrice=0.00;
    var pizzaToppingsChickenPrice=0.00;
    var pizzaToppingsMeatLoversPrice=0.00;
    var pizzaToppingsPremiumHamPrice=0.00;
    var pizzaToppingsPeppersBananaPrice=0.00;
    var pizzaToppingsSpinachPrice=0.00;
    var pizzaToppingsOlivesBlackPrice=0.00;
    var pizzaToppingsOlivesGreenPrice=0.00;
    var pizzaToppingsMushroomsPrice=0.00;
    var pizzaToppingsOnionsPrice=0.00;
    var pizzaToppingsPeppersGreenPrice=0.00;

    var orderForm = document.forms["order-form"];

    var selectedPizzaToppingsPepperoni = orderForm.elements["toppings-pepperoni"];
    var selectedPizzaToppingsSausage = orderForm.elements["toppings-sausage"];
    var selectedPizzaToppingsBacon = orderForm.elements["toppings-bacon"];
    var selectedPizzaToppingsChicken = orderForm.elements["toppings-chicken"];
    var selectedPizzaToppingsMeatLovers = orderForm.elements["toppings-meatlovers"];
    var selectedPizzaToppingsPremiumHam = orderForm.elements["toppings-premiumham"];
    var selectedPizzaToppingsPeppersBanana = orderForm.elements["toppings-peppers-banana"];
    var selectedPizzaToppingsSpinach = orderForm.elements["toppings-spinach"];
    var selectedPizzaToppingsOlivesBlack = orderForm.elements["toppings-olives-black"];
    var selectedPizzaToppingsOlivesGreen = orderForm.elements["toppings-olives-green"];
    var selectedPizzaToppingsMushrooms = orderForm.elements["toppings-mushrooms"];
    var selectedPizzaToppingsOnions = orderForm.elements["toppings-onions"];
    var selectedPizzaToppingsPeppersGreen = orderForm.elements["toppings-peppers-green"];

    if(selectedPizzaToppingsPepperoni.checked==true){
        pizzaToppingsPepperoniPrice=1.00;
    }

    if(selectedPizzaToppingsSausage.checked==true){
        pizzaToppingsSausagePrice=1.00;
    }

    if(selectedPizzaToppingsBacon.checked==true){
        pizzaToppingsBaconPrice=1.00;
    }

    if(selectedPizzaToppingsChicken.checked==true){
        pizzaToppingsChickenPrice=1.00;
    }

    if(selectedPizzaToppingsMeatLovers.checked==true){
        pizzaToppingsMeatLoversPrice=2.25;
    }

    if(selectedPizzaToppingsPremiumHam.checked==true){
        pizzaToppingsPremiumHamPrice=2.25;
    }

    if(selectedPizzaToppingsPeppersBanana.checked==true){
        pizzaToppingsPeppersBananaPrice=0.50;
    }

    if(selectedPizzaToppingsSpinach.checked==true){
        pizzaToppingsSpinachPrice=0.50;
    }

    if(selectedPizzaToppingsOlivesBlack.checked==true){
        pizzaToppingsOlivesBlackPrice=0.50;
    }

    if(selectedPizzaToppingsOlivesGreen.checked==true){
        pizzaToppingsOlivesGreenPrice=0.50;
    }

    if(selectedPizzaToppingsMushrooms.checked==true){
        pizzaToppingsMushroomsPrice=0.50;
    }

    if(selectedPizzaToppingsOnions.checked==true){
        pizzaToppingsOnionsPrice=0.50;
    }

    if(selectedPizzaToppingsPeppersGreen.checked==true){
        pizzaToppingsPeppersGreenPrice=0.50;
    }

    var pizzaToppingsPrice = pizzaToppingsPepperoniPrice + pizzaToppingsSausagePrice + pizzaToppingsBaconPrice + pizzaToppingsChickenPrice
        + pizzaToppingsMeatLoversPrice + pizzaToppingsPremiumHamPrice + pizzaToppingsPeppersBananaPrice + pizzaToppingsSpinachPrice + pizzaToppingsOlivesBlackPrice
        + pizzaToppingsOlivesGreenPrice + pizzaToppingsMushroomsPrice + pizzaToppingsOnionsPrice + pizzaToppingsPeppersGreenPrice;
    return pizzaToppingsPrice;
}

function calculateTotal()
{
    var pizzaPrice = getPizzaSizePrice() + getPizzaCrustPrice() + getToppingsPrice();

    var divobj = document.getElementById('totalPrice');
    divobj.innerHTML = "<BR>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Your order total is $"+pizzaPrice.toFixed(2);
}


function createOrder() {
    return {
    };
}

function saveOrder(pizzaOrder) {
    localStorage.pizza_order = JSON.stringify(pizzaOrder);
}

function getOrder() {
    return (localStorage['pizza_order'])
        ? JSON.parse(localStorage['pizza_order'])
        : createOrder();
}








