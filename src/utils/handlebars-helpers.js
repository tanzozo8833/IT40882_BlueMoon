const Handlebars = require('handlebars');
const moment = require('moment');

Handlebars.registerHelper('formatDate', function (date, format) {
    if (!date) return '';
    if (typeof format !== 'string') {
        format = 'DD/MM/YYYY';
    }

    return moment(date).format(format);
});
