import React, { Component } from 'react';
import FilterTypeahead from './FilterTypeahead.js';

import './Filters.css';

import Button from '../../ui-kit/button';
import Checkbox, { ColorCheckbox } from '../../ui-kit/checkbox';
import Radio from '../../ui-kit/radio';

import InputRange from 'react-input-range';

import 'react-input-range/lib/css/index.css';

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
            selected: {
                color_id,
                main_category,
            },
            onFilterUpdate,
            onApplyFiltersClick,
            onResetFiltersClick,
        } = this.props;

        return (
            <div className="Filters">
                <div>
                    <p className="filter-title pb2">
                        Категория
                    </p>
                    <FilterTypeahead
                        options={ categories }
                        name="main_category"
                        label="Категория"
                        selected={ main_category }
                        onOptionSelected={ onFilterUpdate }
                        />
                </div>
                <div>
                    <p className="filter-title pb2">
                        Тип кузова
                    </p>
                    <FilterTypeahead
                        options={ bodyStyles }
                        name="body_id"
                        label="Тип кузова"
                        onOptionSelected={ onFilterUpdate }
                        />
                </div>
                <ColorFilter
                    name="color_id"
                    colors={ colors }
                    selected={ color_id }
                    onChange={ onFilterUpdate }
                    />
                <div>
                    <p className="filter-title pb2">
                        Марка производителя
                    </p>
                    <FilterTypeahead
                        options={ marks }
                        name="mark_id"
                        label="Марки"
                        onOptionSelected={ onFilterUpdate }
                        />
                </div>
                <FilterTypeahead
                    options={ fuels }
                    name="fuel_id"
                    label="Виды топлива"
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
                <Checkbox
                    name="test"
                    label="Галогенные фары"
                    value="1"
                    />
                <Radio
                    name="test"
                    label="Галогенные фары"
                    value="2"
                    />
                <Radio
                    name="test"
                    label="Галогенные фары"
                    value="3"
                    />
                <InputRange
                    maxValue={ 2017 }
                    minValue={ 1900 }
                    value={{ min: 2000, max: 2015 }}
                    onChange={() => {}} />
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

const ColorFilter = ({
    colors = [],
    selected = [],
    name,
    onChange,
}) => (
    <div style={{ maxWidth: 250 }}>
        <p className="filter-title pb2">
            Цвет
        </p>
        {
            colors.map(color => (
                <ColorCheckbox
                    name={ `${name}_${color.value}` }
                    key={ color.value }
                    color={ color.value }
                    tooltip={ color.name }
                    checked={ selected.indexOf(color.value) !== -1 }
                    onChange={ value => {
                        onChange({
                            name,
                            value: selected.indexOf(value) === -1 ?
                                   [ ...selected, value ] :
                                   selected.filter(s => s !== value),
                        });
                    }}
                    />
            ))
        }
    </div>
);

export default Filters;
