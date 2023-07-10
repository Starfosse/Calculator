//alert("Bonjour, je suis un fichier JavaScript lié à votre page HTML !");
// gsap
// const screen = document.querySelector("#screen");


function stateManager() {
    let stateCalculator = {
        memoryOperator : null,
        memoryOldNbr : 0,
        memoryNewNbr : 0,
        newScreen : null,
        screen : document.querySelector("#screen")
    };

    function copyObject() {
        return { ...stateCalculator };
    }

    function updateState(updater) {
        const newState = typeof updater === 'function' ? updater(copyObject()) : updater;
        if (newState) {
            stateCalculator = newState;
        }
    }

    function getState() {
        return copyObject();
    }

    return {
        updateState,
        getState,
    }
}

const { updateState, getState } = stateManager();

init();

function init() {
    const listButton = document.querySelectorAll("button");
    listButton.forEach(button => {
        !isNaN(button.value)
            ? button.addEventListener("click", numberHandler)
            : button.addEventListener("click", operatorHandler);
    })
}

function numberHandler()
{
    const buttonValue = this.value;
    updateState(state => {
        if(state.newScreen)
        {
            state.screen.textContent = 0;
            state.newScreen = null;
        }
        state.memoryNewNbr = buttonValue;
        state.screen.textContent = Number(state.screen.textContent) * 10 + Number(buttonValue);
        return state;
    });
}

function operatorHandler()
{
    updateState(state => {
        switch(this.value)
        {
            case "÷":
                if(state.newScreen != 1)
                    getResult();
                state.memoryOldNbr = state.screen.textContent;
                state.memoryOperator = "÷";
                state.newScreen = 1;
                break;
            case "x":
                if(state.newScreen != 1)
                    getResult();
                state.memoryOldNbr = state.screen.textContent;
                state.memoryOperator = "x";
                state.newScreen = 1;
                break;
            case "-":
                if(state.newScreen != 1)
                    getResult();
                state.memoryOldNbr = state.screen.textContent;
                state.memoryOperator = "-";
                state.newScreen = 1;
                break;
            case "+":
                if(state.newScreen != 1)
                    getResult();
                state.memoryOldNbr = state.screen.textContent;
                state.memoryOperator = "+";
                state.newScreen = 1;
                break;
            case "=":
                state.newScreen === 1
                    ? getResultRecursive()
                    : getResult();
                state.memoryOldNbr = state.screen.textContent;
                state.newScreen = 1;
                break;
            case "C":
                state.screen.textContent = 0;
                state.memoryOldNbr = null;
                state.memoryOperator = null;
                break;
            case "←":
                state.screen.textContent.length > 1
                    ? state.screen.textContent = state.screen.textContent.substring(0,state.screen.textContent.length - 1)
                    : state.screen.textContent = 0;
                break;
        }
        return state;
    });
}

function getResult()
{
    updateState(state => {
    if (state.memoryOperator == "÷")
        state.screen.textContent = Number(state.memoryOldNbr) / Number(state.screen.textContent);
    else if (state.memoryOperator == "x")
        state.screen.textContent = Number(state.memoryOldNbr) * Number(state.screen.textContent);
    else if (state.memoryOperator == "-")
        state.screen.textContent = Number(state.memoryOldNbr) - Number(state.screen.textContent);
    else if (state.memoryOperator == "+")
        state.screen.textContent = Number(state.memoryOldNbr) + Number(state.screen.textContent);
    return state;
    })
}

function getResultRecursive()
{
    updateState(state => {
    if (state.memoryOperator == "÷")
        state.screen.textContent = Number(state.screen.textContent) / Number(state.memoryNewNbr);
    else if (state.memoryOperator == "x")
        state.screen.textContent = Number(state.screen.textContent) * Number(state.memoryNewNbr);
    else if (state.memoryOperator == "-")
        state.screen.textContent = Number(state.screen.textContent) - Number(state.memoryNewNbr);
    else if (state.memoryOperator == "+")
        state.screen.textContent = Number(state.screen.textContent) + Number(state.memoryNewNbr);
    return state;
    })
}
