/*
 * What car to buy?
 */

import React, { Component } from 'react';
import 'basscss/css/basscss.css';
import './App.scss'; // just for vim reference
import './App.css';
import {
    // VictoryScatter,
    VictoryBar,
    VictoryChart,
    VictoryTheme,
    VictoryAxis,
} from 'victory';

import API from './api.js';
import FilterTypeahead from './FilterTypeahead.js';
import Footer from './Footer.js';

// TODO: Move to helpers
// const normalize = name => array => array.reduce((acc, obj) => ({ ...acc, [obj[name]]: obj }), {});
// ------------------------------
        //
        // const getMarkData = mark =>
        //     API.getByMark({
        //         mark,
        //     }).then(data => {
        //
        //         // Just ignore all data where no options
        //         // available
        //         if (data.total === 0) {
        //             return;
        //         }
        //
        //         // Using a function as we are relying on the
        //         // previous state, so this ensures we use the
        //         // latest one
        //         this.setState(prevState => ({
        //             data: [
        //                 ...prevState.data,
        //                 {
        //                     manufacturer: mark.name,
        //                     ...data,
        //                 },
        //             ],
        //         }));
        //     });
        //
        // // API.getMarks({ categoryId: 1 }).then(marks => Promise.all(marks.slice(0, 50).map(getMarkData)));

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filters: {},

            filtersData: {
                fuels: [],
                categories: [],
                colors: [],
                states: [],
            },

            data: [],
        };

        this.loadInitialFiltersData = this.loadInitialFiltersData.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
    }

    componentDidMount() {
        this.loadInitialFiltersData();
    }

    loadInitialFiltersData() {
        const setFilterData = name => data => this.setState(prevState => ({
            ...prevState,
            filtersData: {
                ...prevState.filtersData,
                [name]: data,
            },
        }));

        API.getCategories().then(setFilterData('categories'));
        API.getColors().then(setFilterData('colors'));
        API.getFuels().then(setFilterData('fuels'));
        API.getStates().then(setFilterData('states'));
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state.filters);

        const {
            main_category: oldCategory,
        } = this.state.filters;
        const {
            main_category: newCategory,
        } = prevState.filters;

        if (oldCategory !== newCategory) {
            console.log('New category');
        }


    }

    updateFilter({ name, value }) {
        this.setState(prevState => ({
            ...prevState,
            filters: {
                ...prevState.filters,
                [name]: value,
            },
        }));
    }

    render() {
        return (
            <div className="App">
                <div className="flex">
                    <Filters
                        options={ this.state.filtersData }
                        onFilterUpdate={ this.updateFilter }
                        />
                    <div>
                        <VictoryChart
                            theme={ VictoryTheme.material }
                            width={ 500 }
                            height={ 300 }
                            style={{
                                width: 500,
                                height: 300,
                            }}
                            >
                            <VictoryAxis
                                style={{
                                    tickLabels: {
                                        fontSize: 10,
                                        angle: -90,
                                    },
                                }}
                                />
                            <VictoryAxis
                                dependentAxis
                                scale="sqrt"
                                style={{
                                    tickLabels: {
                                        fontSize: 10,
                                    },
                                }}
                                />
                            <VictoryBar
                                data={ this.state.data }
                                x="manufacturer"
                                y="interQuartileMean"
                                />
                        </VictoryChart>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

class Filters extends Component {
    render() {
        const {
            options: {
                categories,
                fuels,
                colors,
                states,
            },
            onFilterUpdate,
        } = this.props;

        return (
            <div className="Filters">
                <FilterTypeahead
                    options={ categories }
                    name="main_category"
                    label="Category"
                    onOptionSelected={ onFilterUpdate }
                    />
                <FilterTypeahead
                    options={ fuels }
                    name="fuels"
                    label="Fuels"
                    multiple={ true }
                    onOptionSelected={ onFilterUpdate }
                    />
                <FilterTypeahead
                    options={ colors }
                    name="color"
                    label="Color"
                    multiple={ true }
                    onOptionSelected={ onFilterUpdate }
                    />
                <FilterTypeahead
                    options={ states }
                    name="states"
                    multiple={ true }
                    label="States"
                    onOptionSelected={ onFilterUpdate }
                    />
            </div>
        );
    }
}

export default App;
