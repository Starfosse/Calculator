//alert("Bonjour, je suis un fichier JavaScript lié à votre page HTML !");


const screen = document.querySelector("#screen");
const listNumberButton = document.querySelectorAll(".number");
const operatorButton = document.querySelectorAll(".operator");
const backButton = document.querySelector("#back");
const cButton = document.querySelector("#C");

for(let button of listNumberButton)
{
    button.addEventListener("click", () =>
    {
        if(screen.textContent == 0)
            screen.textContent = button.value;
    })
}

function operatorHandler(nbr1, nbr2, operator)
{
    switch(operator)
    {
        case "÷":
            return(nbr1 / nbr2);
        case "x":
            return(nbr1 * nbr2);
        case "-":
            return(nbr1 - nbr2);
        case "+":
            return(nbr1 + nbr2);
    }
}