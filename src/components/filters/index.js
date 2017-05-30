import React, { Component } from 'react';
import FilterTypeahead from './FilterTypeahead.js';

import './Filters.scss';
import './Filters.css';

import Button from '../../ui-kit/button';
import Checkbox from '../../ui-kit/checkbox';
import Radio from '../../ui-kit/radio';

class Filters extends Component {
    render() {
        const {
            options: {
                categories,
                bodyStyles,
                marks,
                fuels,
                colors,
                states,
                cities,
            },
            onFilterUpdate,
            onApplyFiltersClick,
            onResetFiltersClick,
        } = this.props;

        return (
            <div className="Filters">
                <Checkbox
                    name="test"
                    label="Галогенные фары"
                    />
                <Radio
                    name="foobar"
                    label="Фары"
                    />
                <Radio
                    name="foobar"
                    label="Фары"
                    />
                <Radio
                    name="foobar"
                    label="Фары"
                    />
                <FilterTypeahead
                    options={ categories }
                    name="main_category"
                    label="Категория"
                    onOptionSelected={ onFilterUpdate }
                    />
                <FilterTypeahead
                    options={ bodyStyles }
                    name="body_id"
                    label="Тип кузова"
                    onOptionSelected={ onFilterUpdate }
                    />
                <FilterTypeahead
                    options={ marks }
                    name="mark_id"
                    label="Марки"
                    onOptionSelected={ onFilterUpdate }
                    />
                <FilterTypeahead
                    options={ fuels }
                    name="fuel_id"
                    label="Виды топлива"
                    multiple={ true }
                    onOptionSelected={ onFilterUpdate }
                    />
                <FilterTypeahead
                    options={ colors }
                    name="color_id"
                    label="Цвет"
                    multiple={ true }
                    onOptionSelected={ onFilterUpdate }
                    />
                <FilterTypeahead
                    options={ states }
                    name="state_id"
                    multiple={ true }
                    label="Область"
                    onOptionSelected={ onFilterUpdate }
                    />
                <FilterTypeahead
                    options={ cities }
                    name="city_id"
                    multiple={ true }
                    label="Города"
                    onOptionSelected={ onFilterUpdate }
                    />
                <div className="footer py2 center">
                    <div className="mb1">
                        <Button
                            type="primary"
                            onClick={ onApplyFiltersClick }>
                            Применить фильтры
                        </Button>
                    </div>
                    <div>
                        <Button onClick={ onResetFiltersClick }>
                            Сбросить фильтры
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Filters;
