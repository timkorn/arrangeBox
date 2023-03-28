import { ArrangeBox } from "./arrangeBox";
import { TFootballers } from "./types";

export class ArrangeControl {
    private values: TFootballers;
    private initialValues: TFootballers;
    private buttonContainerId: string;
    private id: string;
    private context: ArrangeBox;
    private chosenElementIndexes: number[];
    private searchString = "";
    private inputContainerId: string;

    constructor(parent: HTMLDivElement, initialValues: TFootballers, title: string, controlId: string, direction: "l" | "r", context: ArrangeBox) {
        this.chosenElementIndexes = [];
        this.initialValues = initialValues;
        this.context = context;
        const control = document.createElement('div');
        control.classList.add('control');
        const buttonsHTML = `
        <div class='buttonsContainer' id='buttonsContainer_${controlId}'>
            
        </div>`
        const controlHTML = `
        <div class='controlElements'>
            <h3>${title}</h3>
            <div id='input_container_${controlId}' class='input_container'>  </div>
            <div class='itemsContainer' id='${controlId}'>
                
            </div>
        </div>
            `
        this.buttonContainerId = `#buttonsContainer_${controlId}`;
        if (direction === "l") {
            control.innerHTML = buttonsHTML + controlHTML;
        } else {
            control.innerHTML = controlHTML + buttonsHTML;
        }
        this.inputContainerId = `#input_container_${controlId}`;
        this.id = "#" + controlId;
        this.values = [...initialValues];
        this.initialValues = [...initialValues];
        parent.appendChild(control);
    }

    get getChosenElementValues() {
        const chosenValues = this.chosenElementIndexes.map((item) => this.values[item]);
        this.values = this.values.filter((_, i) => !this.chosenElementIndexes.includes(i))
        this.chosenElementIndexes = [];
        return chosenValues;
    }

    appendValues(val: TFootballers) {
        this.values = [...this.values, ...val]
    }

    onItemClick(e: MouseEvent) {
        const targetElement = e.currentTarget as HTMLDivElement;
        if (targetElement) {
            const id = Number(targetElement.id);
            if (Number.isInteger(id)) {
                if (!this.chosenElementIndexes.length) {
                    this.chosenElementIndexes.push(id);
                    this.render();
                } else {
                    if (this.chosenElementIndexes.includes(id)) {
                        this.chosenElementIndexes.splice(this.chosenElementIndexes.indexOf(id), 1);
                        this.render();
                    }
                    else if (e.ctrlKey) {
                        this.chosenElementIndexes.push(id);
                        this.render();
                    }
                }
            }
        }
    }


    handleUp() {
        if (this.chosenElementIndexes.length === 1) {
            if (this.chosenElementIndexes[0] !== 0) {
                const index = this.chosenElementIndexes[0];
                [this.values[index], this.values[index - 1]] = [this.values[index - 1], this.values[index]];
                this.chosenElementIndexes[0] -= 1;
                this.render();
            }
        }
    }

    handleDown() {
        if (this.chosenElementIndexes.length === 1) {
            if (this.chosenElementIndexes[0] < this.values.length - 1) {
                const index = this.chosenElementIndexes[0];
                [this.values[index], this.values[index + 1]] = [this.values[index + 1], this.values[index]];
                this.chosenElementIndexes[0] += 1;
                this.render();
            }
        }
    }

    refresh() {
        this.chosenElementIndexes = [];
        this.values = [...this.initialValues];
        this.searchString = "";
    }

    handleSearch(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            const input = e.currentTarget as HTMLInputElement | null;
            if (input) {
                this.chosenElementIndexes = [];
                this.searchString = input.value;
                this.render();
            }
        }
    }

    handleClear() {
        this.values = [];
        this.chosenElementIndexes = [];
        this.searchString = "";
        this.render();
    }

    afterRender() {
        const element = document.querySelector<HTMLDivElement>(this.id);
        const buttonContainer = document.querySelector<HTMLDivElement>(this.buttonContainerId);
        const inputContainer = document.querySelector<HTMLDivElement>(this.inputContainerId);

        if (buttonContainer) {
            const buttonUp = buttonContainer.querySelector<HTMLDivElement>("#buttonUp");
            buttonUp?.addEventListener("click", this.handleUp.bind(this));
            const buttonDown = buttonContainer.querySelector<HTMLDivElement>("#buttonDown");
            buttonDown?.addEventListener("click", this.handleDown.bind(this));
            const buttonClear = buttonContainer.querySelector<HTMLDivElement>("#buttonClear");
            buttonClear?.addEventListener("click", this.handleClear.bind(this));
        }
        if (element) {
            const nodes = element.childNodes;
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].addEventListener("click", (e) => { this.onItemClick(e as MouseEvent) });
            }
        }
        if (inputContainer) {
            const input = inputContainer.querySelector<HTMLDivElement>("#search");
            input?.addEventListener("keydown", this.handleSearch.bind(this))
        }
        this.context.updateEventListeners();
    }

    render() {
        const element = document.querySelector<HTMLDivElement>(this.id);
        const buttonsContainer = document.querySelector<HTMLDivElement>(this.buttonContainerId);
        const inputContainer = document.querySelector<HTMLDivElement>(this.inputContainerId);
        if (element) {
            let values = this.values;
            if (this.searchString) {
                values = values.filter((item) => item.name.toLowerCase().includes(this.searchString.toLowerCase()));
            }
            element.innerHTML = values.
                map((item, i) => `<div class='playerItem ${this.chosenElementIndexes.includes(i) && "itemChosen"}' id=${i}><img src=${item.image} alt="${item.name}" /> <h4>${item.name}</h4></div>`).
                reduce((prev, cur) => prev + cur, "");
        }
        if (buttonsContainer) {
            buttonsContainer.innerHTML = `
                <button id="buttonUp"> up </button>
                <button id="buttonDown"> down </button>
                <button id="buttonClear"> clear </button>
            `;
        }
        if (inputContainer) {
            const input = inputContainer.querySelector("#search") as HTMLInputElement | null;
            let value = "";
            if (input) {
                value = input.value;
            }
            inputContainer.innerHTML = `<input placeholder='search'id='search' value="${value}" />`;
        }
        this.afterRender();
    }
}
