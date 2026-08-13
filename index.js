/*
Name: Joshua Rogers
Class: CSCI-3300-W08
Assignment: 06 Functions and Arrays
Program Date: April 16, 2026
File: index.js (home page) 
*/

//Question 1 - Rectangle Calculator

/*This function calculates the area of a rectangle.
It receives height and width as parameters.
It returns the area.*/
function getArea(height, width) {
    return height * width;
}

/*This function calculates the perimeter of a rectangle.
It receives height and width as parameters.
It returns the perimeter.*/
function getPerimeter(height, width) {
    return 2 * (height + width);
}

/*This function calculates the distance between two opposite corners.
This uses the Pythagorean theorem.
It receives height and width as parameters.
It returns the diagonal distance.*/
function getOppositeCornerDistance(height, width) {
    return Math.sqrt((height * height) + (width * width));
}

/*This is the main function for Question 1.
It pulls the values from the text boxes,
calls the three required functions,
and prints the results to the screen.*/
function calculateRectangle() {

    //Get the height value from the HTML input box and turn it into a number
    let height = parseFloat(document.getElementById("height").value);

    //Get the width value from the HTML input box and turn it into a number
    let width = parseFloat(document.getElementById("width").value);

    //Store the output div in a variable so it is easier to use later
    let output = document.getElementById("rectangleOutput");

    //Check to make sure the user entered valid numbers
    if (isNaN(height) || isNaN(width)) {
        output.innerHTML = "Please enter valid numbers for height and width.";
        return;
    }

    //Call the required functions and store the returned results
    let area = getArea(height, width);
    let perimeter = getPerimeter(height, width);
    let diagonal = getOppositeCornerDistance(height, width);

    //Print the results to the screen
    output.innerHTML =
        "<p><strong>Area:</strong> " + area.toFixed(2) + "</p>" +
        "<p><strong>Perimeter:</strong> " + perimeter.toFixed(2) + "</p>" +
        "<p><strong>Distance Between Opposite Corners:</strong> " + diagonal.toFixed(2) + "</p>";
}

//Question 2 - Olympic Judging Calculator

/*This function finds the smallest number in an array.
It uses a for-loop as required by the assignment.
It returns the smallest value.*/
function getSmallest(values) {

    //Start by assuming the first value is the smallest
    let smallest = values[0];

    //Loop through the rest of the array
    for (let i = 1; i < values.length; i++) {

        //If the current value is smaller, update smallest
        if (values[i] < smallest) {
            smallest = values[i];
        }
    }

    //Return the smallest value found
    return smallest;
}

/*This function finds the largest number in an array.
It uses a for-loop.
It returns the largest value.*/
function getLargest(values) {

    //Start by assuming the first value is the largest
    let largest = values[0];

    //Loop through the rest of the array
    for (let i = 1; i < values.length; i++) {

        //If the current value is larger, update largest
        if (values[i] > largest) {
            largest = values[i];
        }
    }

    //Return the largest value found
    return largest;
}

/*This function adds together all numbers in an array.
It uses a for-loop.
It returns the total sum.*/
function getSum(values) {

    //Start with a sum of 0
    let sum = 0;

    //Loop through every value in the array
    for (let i = 0; i < values.length; i++) {

        //Add the current value to the sum
        sum += values[i];
    }

    //Return the total
    return sum;
}

/*This function finds the unbiased average.
It removes the smallest and largest values,
then averages the remaining six values.*/
function getUnbiasedAverage(values) {

    //Get the total sum of all eight judge scores
    let sum = getSum(values);

    //Find the smallest score
    let smallest = getSmallest(values);

    //Find the largest score
    let largest = getLargest(values);

    //Subtract the largest and smallest, then divide by 6
    return (sum - smallest - largest) / 6;
}

/*This is the main function for Question 2.
It gets the judge scores from the page,
puts them into an array,
calls the required functions,
and prints the results.*/
function calculateJudging() {

    //Create an empty array to hold the 8 judge scores
    let scores = [];

    //Store the output div in a variable
    let output = document.getElementById("judgingOutput");

    //Loop through judge1 through judge8
    for (let i = 1; i <= 8; i++) {

        //Get each judge score from the matching input box
        let score = parseFloat(document.getElementById("judge" + i).value);

        //If any score is not a number, show an error message
        if (isNaN(score)) {
            output.innerHTML = "Please enter valid numbers for all eight judges.";
            return;
        }

        //Add the score into the scores array
        scores.push(score);
    }

    //Call the required functions
    let smallest = getSmallest(scores);
    let largest = getLargest(scores);
    let total = getSum(scores);
    let average = getUnbiasedAverage(scores);

    //Display the results
    output.innerHTML =
        "<p><strong>Smallest Score:</strong> " + smallest.toFixed(2) + "</p>" +
        "<p><strong>Largest Score:</strong> " + largest.toFixed(2) + "</p>" +
        "<p><strong>Total of All Scores:</strong> " + total.toFixed(2) + "</p>" +
        "<p><strong>Unbiased Average:</strong> " + average.toFixed(2) + "</p>";
}

//Question 3 - Point of Sale System

/*This object stores all product information.
Each product has a key.
Each key contains an object with a product name and price.*/
let products = {
    "umbrella": { "name": "Umbrella", "price": 21.95 },
    "raincoat": { "name": "Rain Coat", "price": 88.99 },
    "swimsuit": { "name": "Swimsuit", "price": 36.99 }
};

/*This variable keeps track of the running total
as items are added to the cart.*/
let runningTotal = 0;

/*This function displays all products and their prices on the page.
It uses a for-loop to pull information from the products object.*/
function displayProducts() {

    //Start with an empty string
    let output = "";

    //Get the product list area from the page
    let productList = document.getElementById("productList");

    //Loop through each key in the products object
    for (let key in products) {

        //Add one product and price to the output string
        output += "<p><strong>" + products[key].name + "</strong> - $" + products[key].price.toFixed(2) + "</p>";
    }

    //Show the full product list on the page
    productList.innerHTML = output;
}

/*This function adds the selected product and quantity to the cart.
It updates the running total each time the button is clicked.*/
function addToCart() {

    //Get the selected product key from the dropdown menu
    let selectedProductKey = document.getElementById("productSelect").value;

    //Get the quantity from the input box and convert it to an integer
    let quantity = parseInt(document.getElementById("quantity").value);

    //Get the cart output area
    let cartOutput = document.getElementById("cartOutput");

    //Get the total output area
    let totalOutput = document.getElementById("totalOutput");

    //Check that the quantity is a valid positive number
    if (isNaN(quantity) || quantity <= 0) {
        cartOutput.innerHTML += "<p>Please enter a valid quantity.</p>";
        return;
    }

    //Use the selected key to get the full product object
    let selectedProduct = products[selectedProductKey];

    //Calculate the total cost for this one cart entry
    let itemTotal = selectedProduct.price * quantity;

    //Add the item total to the running total
    runningTotal += itemTotal;

    //Add the item information to the cart output area
    cartOutput.innerHTML +=
        "<p>" + selectedProduct.name + " x " + quantity +
        " = $" + itemTotal.toFixed(2) + "</p>";

    //Update the running total shown on the page
    totalOutput.innerHTML = "$" + runningTotal.toFixed(2);
}

/*This runs when the page first loads.
It calls displayProducts() so the products are shown automatically.*/
window.onload = function () {
    displayProducts();
};