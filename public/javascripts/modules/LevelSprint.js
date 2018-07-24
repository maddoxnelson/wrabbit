import { submitForm } from './sprintHelpers';
import { setPrompt } from './prompt';

class LevelSprint {
    constructor() {
        this.initialize = this.initialize.bind(this);
        this.loadUpPrompt = this.loadUpPrompt.bind(this);

        this.initialize();
    }

    handleSubmit() {
        const bitForm = document.querySelector('#bit')
        if (!bitForm) return;
        bitForm.addEventListener('submit', e => {
            e.preventDefault()
            
        })
    }

    loadUpPrompt() {
        const startBtn = document.querySelector('#level-start')
        if (!startBtn) return;
        startBtn.addEventListener('click', setPrompt);
    }

    initialize() {
        this.loadUpPrompt();
        this.handleSubmit();
    }

}

export default LevelSprint;