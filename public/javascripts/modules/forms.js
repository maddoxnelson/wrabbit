import axios from 'axios';

class BitFilter {
    constructor() {
        this.bits = []
        this.userSlug = ''

        this.initialize = this.initialize.bind(this)
        this.setBits = this.setBits.bind(this)
    }

    async setBits() {
        this.bits = await axios(`/api/bits/${this.userSlug}`)
        console.log()
        console.log(this)
    }

    initialize() {
        console.log('init...sdfsd')
        const bitForm = document.querySelector('#bit-form');
        if (!bitForm) return;
        this.userSlug = bitForm.dataset.userSlug
        this.setBits()
    }
}

export const bitFilter = new BitFilter();