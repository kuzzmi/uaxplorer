import React, { Component } from 'react';
import { Typeahead } from 'react-typeahead';

import './FilterTypeahead.scss';
import './FilterTypeahead.css';

class FilterTypeahead extends Component {
    render() {
        const {
            name,
            options,
            label,
            onOptionSelected,
        } = this.props;

        const elementId = `filter-${name}`;

        return (
            <div className="FilterTypeahead mb2">
                <div>
                    <label htmlFor={ elementId }>{ label }</label>
                </div>
                <div id={ elementId }>
                    <Typeahead
                        options={ options }
                        filterOption="name"
                        displayOption="name"
                        showOptionsWhenEmpty={ true }
                        customClasses={{
                            results: 'list-reset',
                        }}
                        onOptionSelected={ value => {
                            onOptionSelected({
                                name,
                                value: value.value,
                            });
                        }}
                        />
                </div>
            </div>
        )
    }
}

export default FilterTypeahead;
