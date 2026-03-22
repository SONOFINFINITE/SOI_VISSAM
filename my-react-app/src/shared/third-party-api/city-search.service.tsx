import axios from 'axios';

const API_KEY = '20cd18f46288dcd2ce692cfa4c9d10ca0c0baae8';

interface Suggestion {
    value: string;
    data: {
        city: string;
    };
}

export const searchCities = async (query: string): Promise<string[]> => {
    try {
        const response = await axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
            query: query,
            count: 5,
            locations: [{ country: 'Россия' }],
            from_bound: { value: 'city' },
            to_bound: { value: 'city' }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${API_KEY}`
            }
        });

        return response.data.suggestions.map((suggestion: Suggestion) => suggestion.data.city);
    } catch (error) {
        console.error('Ошибка при поиске городов', error);
        return [];
    }
};

export const getCityByIP = async (): Promise<string> => {
    try {
        const response = await axios.get('https://suggestions.dadata.ru/suggestions/api/4_1/rs/detectAddressByIp', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${API_KEY}`
            }
        });
        return response.data.location.data.city;
    } catch (error) {
        console.error('Ошибка при определении города по IP', error);
        return 'Неизвестно';
    }
};