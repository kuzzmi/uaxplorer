const processRequest = data => data.json();
const baseUrl = 'http://api.auto.ria.com/';

const objectToQueryString = (obj = {}) =>
    Object.keys(obj).reduce((acc, key) => {
        let str = '';
        if (Array.isArray(obj[key])) {
            str = obj[key].map(v => `${key}=${v}`).join('&');
        } else if (typeof obj[key] === 'boolean') {
            str = `${key}=${ obj[key] ? 1 : 0 }`;
        } else {
            str = `${key}=${obj[key]}`;
        }
        return `${acc}&${str}`;
    }, '?');

const API = {
    request: ({ options = {}, endpoint = 'average' }) => {
        const queryString = objectToQueryString(options);
        const url = [baseUrl, endpoint, queryString].join('');

        return fetch(url, {
            method: 'GET',
        }).then(processRequest);
    },

    getCategories: () =>
        API.request({
            endpoint: 'categories',
        }),

    getBodyStyles: ({ categoryId }) =>
        API.request({
            endpoint: `categories/${categoryId}/bodystyles`,
        }),

    getMarks: ({ categoryId }) =>
        API.request({
            endpoint: `categories/${categoryId}/marks`,
        }),

    getMarkModels: ({ categoryId, markId }) =>
        API.request({
            endpoint: `categories/${categoryId}/marks/${markId}`,
        }),

    getStates: () =>
        API.request({
            endpoint: 'states',
        }),

    getCities: ({ stateId }) =>
        API.request({
            endpoint: `states/${stateId}/cities`,
        }),

    getGearboxes: ({ categoryId }) =>
        API.request({
            endpoint: `categories/${categoryId}/gearboxes`,
        }),

    getDriverTypes: ({ categoryId }) =>
        API.request({
            endpoint: `categories/${categoryId}/driverTypes`,
        }),

    getFuels: () =>
        API.request({
            endpoint: 'fuels',
        }),

    getColors: () =>
        API.request({
            endpoint: 'colors',
        }),

    getOptions: categoryId =>
        API.request({
            endpoint: `categories/${categoryId}/options`,
        }),

    getByMark: mark =>
        API.request({
            options: {
                main_category: 1,
                marka_id: mark.value,
            },
        }),

};

export default API;
