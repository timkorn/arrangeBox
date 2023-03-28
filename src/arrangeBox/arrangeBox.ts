import { ArrangeControl } from "./arrangeControl";
import { TFootballers } from "./types";


export class ArrangeBox {
    private leftControl: ArrangeControl;
    private rightControl: ArrangeControl;
    private buttonsId: string;
    constructor(parent: HTMLDivElement, values: TFootballers) {
        const index = parent.childElementCount;
        const controlWrapper = document.createElement('div');
        controlWrapper.classList.add('controlWrapper');
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttonsContainer');
        buttonsContainer.id = `buttonsContainer_${index}`;
        this.buttonsId = `#buttonsContainer_${index}`;

        this.leftControl = new ArrangeControl(controlWrapper, [...values], "Players", `leftControl_${index}`, 'l', this);
        controlWrapper.appendChild(buttonsContainer);
        this.rightControl = new ArrangeControl(controlWrapper, [], "Chosen players", `rightControl_${index}`, 'r', this);
        parent.appendChild(controlWrapper);
        this.render();
    }

    handleButtonRight() {
        const values = this.leftControl.getChosenElementValues;
        if (values.length) {
            this.rightControl.appendValues(values);
            this.render();
        }
    }

    handleButtonLeft() {
        const values = this.rightControl.getChosenElementValues;
        if (values.length) {
            this.leftControl.appendValues(values);
            this.render();
        }
    }

    handleButtonRefresh() {
        this.leftControl.refresh();
        this.rightControl.refresh();
        this.render();
    }

    updateEventListeners() {
        const buttonsCont = document.querySelector(this.buttonsId);
        if (buttonsCont) {
            buttonsCont.innerHTML = `
            <button id='buttonRight'> > </button>
            <button id='buttonLeft'> < </button>
            <button id='buttonRefresh'> refresh </button>
        `;
            const buttonRight = buttonsCont?.querySelector("#buttonRight");
            buttonRight?.addEventListener("click", this.handleButtonRight.bind(this));
            const buttonLeft = buttonsCont?.querySelector("#buttonLeft");
            buttonLeft?.addEventListener("click", this.handleButtonLeft.bind(this));
            const buttonRefresh = buttonsCont?.querySelector("#buttonRefresh");
            buttonRefresh?.addEventListener("click", this.handleButtonRefresh.bind(this));
        }
    }

    render() {
        this.leftControl.render();
        this.rightControl.render();
    }
}





