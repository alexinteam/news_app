import moment from 'moment';

export const getShortDate = (date) => {
    return new moment(date).format('DD MMM');
}

export const getFromNow = (date) => {
    return new moment(date).fromNow();
}