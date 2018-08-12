import moment from 'moment';
import Pikaday from 'pikaday';

class Calendar {
    initialize() {
        console.log('hi')
        const picker = new Pikaday({
            field: document.getElementById('datepicker'),
            format: 'D MMM YYYY',
            onSelect: function() {
                console.log(this.getMoment().format('Do MMMM YYYY'));
            }
        })
    }
}

export const calendar = new Calendar();