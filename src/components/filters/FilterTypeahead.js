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
                <div id={ elementId }>
                    <Typeahead
                        placeholder={ label }
                        options={ options }
                        filterOption="name"
                        displayOption="name"
                        showOptionsWhenEmpty={ true }
                        customClasses={{
                            results: 'list-reset mt0',
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
        );
    }
}

export default FilterTypeahead;
