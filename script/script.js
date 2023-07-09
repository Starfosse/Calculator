//alert("Bonjour, je suis un fichier JavaScript lié à votre page HTML !");
// gsap
// const screen = document.querySelector("#screen");


function stateManager() {
    let stateCalculator = {
        memoryOperator : null,
        memoryNumber : null,
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
    updateState(state => {
        if(state.newScreen)
        {
            state.screen.textContent = 0;
            state.newScreen = null;
        }
        state.screen.textContent = Number(state.screen.textContent) * 10 + Number(this.value);
        return state;
    });
}

function operatorHandler()
{
    updateState(state => {
        switch(this.value)
        {
            case "÷":
                state.memoryNumber = state.screen.textContent;
                state.memoryOperator = "÷";
                state.newScreen = 1;
                break;
            case "x":
                state.memoryNumber = state.screen.textContent;
                state.memoryOperator = "x";
                state.newScreen = 1;
                break;
            case "-":
                state.memoryNumber = state.screen.textContent;
                state.memoryOperator = "-";
                state.newScreen = 1;
                break;
            case "+":
                state.memoryNumber = state.screen.textContent;
                state.memoryOperator = "+";
                state.newScreen = 1;
                break;
            case "=":
                state.screen.textContent = getResult();
                state.memoryNumber = state.screen.textContent;
                state.newScreen = 1;
                break;
            case "C":
                state.screen.textContent = 0;
                break;
            case "←":
                if(state.screen.textContent.length > 1)
                state.screen.textContent = state.screen.textContent.substring(0,state.screen.textContent.length - 1);
                else
                    state.screen.textContent = 0;
                break;
        }
        return state;
    });
}

function getResult()
{
    updateState(state => {
    if (state.memoryOperator == "÷")
        return (state.memoryOperator = null, Number(state.memoryNumber) / Number(state.screen.textContent));
    else if (state.memoryOperator == "x")
        return (state.memoryOperator = null, Number(state.memoryNumber) * Number(state.screen.textContent));
    else if (state.memoryOperator == "-")
        return (state.memoryOperator = null, Number(state.memoryNumber) - Number(state.screen.textContent));
    else if (state.memoryOperator == "+")
        return (state.memoryOperator = null, Number(state.memoryNumber) + Number(state.screen.textContent));
    return state;
    })
}