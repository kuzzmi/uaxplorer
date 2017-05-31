import React from 'react';

import './Checkbox.scss';
import './Checkbox.css';

export default ({
    name,
    label,
    checked,
    onChange,
}) => (
    <div className="checkbox my1">
        <input
            id={ name }
            type="checkbox"
            defaultChecked={ true }
            />
        <label htmlFor={ name }
            className="align-middle">
            { label }
        </label>
    </div>
);

const COLORS = {
    1: '#F5F5DC',
    2: '#000000',
    3: '#0000FF',
    4: '#3F2109',
    5: '#964B00',
    6: '#FFD700',
    7: '#4FA83D',
    8: '#808080',
    9: '#FF681F',
    10: '#F8F4FF',
    11: '#FFC0CB',
    12: '#240A40',
    13: '#FF0000',
    14: '#C0C0C0',
    15: '#FFFFFF',
    16: '#FFFF00',
    17: '#0095B6',
    18: '#DE0C62',
    19: '#F1E788',
    20: '#800000',
    21: '#4A444B',
};

// {name: "Бежевый",    value: 1}
// {name: "Черный",     value: 2}
// {name: "Синий",      value: 3}
// {name: "Бронзовый",  value: 4}
// {name: "Коричневый", value: 5}
// {name: "Золотой",    value: 6}
// {name: "Зеленый",    value: 7}
// {name: "Серый",      value: 8}
// {name: "Апельсин",   value: 9}
// {name: "Магнолии",   value: 10}
// {name: "Розовый",    value: 11}
// {name: "Фиолетовый", value: 12}
// {name: "Красный",    value: 13}
// {name: "Серебряный", value: 14}
// {name: "Белый",      value: 15}
// {name: "Желтый",     value: 16}
// {name: "Голубой",    value: 17}
// {name: "Вишнёвый",   value: 18}
// {name: "Сафари",     value: 19}
// {name: "Гранатовый", value: 20}
// {name: "Асфальт",    value: 21}

export const ColorCheckbox = ({
    name,
    color,
    checked,
    onChange,
}) => (
    <div className="checkbox color-checkbox m1 inline-block">
        <input
            id={ name }
            type="checkbox"
            defaultChecked={ checked }
            />
        <label htmlFor={ name }
            className={
                [1, 6, 10, 11, 15, 16, 19].indexOf(color) !== -1 ?
                    'align-middle light-color' :
                    'align-middle dark-color'
            }
            style={{
                backgroundColor: COLORS[color],
            }}>
        </label>
    </div>
);
