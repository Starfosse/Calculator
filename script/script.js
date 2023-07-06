//alert("Bonjour, je suis un fichier JavaScript lié à votre page HTML !");

const screen = document.querySelector("#screen");
const listButton = document.querySelectorAll("button");
let memoryOperator = null;
let memoryNumber = null;
let newScreen = null;

for(let button of listButton)
{
    if (!isNaN(button.value))
        button.addEventListener("click", numberHandler);
    else
        button.addEventListener("click", operatorHandler);
}

function numberHandler()
{
    if(newScreen)
    {
        screen.textContent = 0;
        newScreen = null;
    }
    screen.textContent = Number(screen.textContent) * 10 + Number(this.value);
}

function operatorHandler()
{
    switch(this.value)
    {
        case "÷":
            memoryNumber = screen.textContent;
            memoryOperator = "÷";
            newScreen = 1;
            break;
        case "x":
            memoryNumber = screen.textContent;
            memoryOperator = "x";
            newScreen = 1;
            break;
        case "-":
            memoryNumber = screen.textContent;
            memoryOperator = "-";
            newScreen = 1;
            break;
        case "+":
            memoryNumber = screen.textContent;
            memoryOperator = "+";
            newScreen = 1;
            break;
        case "=":
            screen.textContent = getResult();
            memoryNumber = screen.textContent;
            newScreen = 1;
            break;
        case "C":
            screen.textContent = 0;
            break;
        case "←":
            if(screen.textContent.length > 1)
                screen.textContent = screen.textContent.substring(0,screen.textContent.length - 1);
            else
                screen.textContent = 0;
            break;
    }
}

function getResult()
{
    if (memoryOperator == "÷")
        return (memoryOperator = null, Number(memoryNumber) / Number(screen.textContent));
    else if (memoryOperator == "x")
        return (memoryOperator = null, Number(memoryNumber) * Number(screen.textContent));
    else if (memoryOperator == "-")
        return (memoryOperator = null, Number(memoryNumber) - Number(screen.textContent));
    else if (memoryOperator == "+")
        return (memoryOperator = null, Number(memoryNumber) + Number(screen.textContent));
}