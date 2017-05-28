/*
 * What car to buy?
 */

import React, { Component } from 'react';
import 'basscss/css/basscss.css';
import './App.scss'; // just for vim reference
import './App.css';
import {
    VictoryScatter,
    Point,
    // VictoryBar,
    VictoryTooltip,
    VictoryChart,
    VictoryTheme,
    VictoryAxis,
} from 'victory';

import API from './api.js';
import FilterTypeahead from './FilterTypeahead.js';
import Footer from './Footer.js';

// TODO: Move to helpers
// const normalize = name => array => array.reduce((acc, obj) => ({ ...acc, [obj[name]]: obj }), {});
const bind =context => name => context[name] = context[name].bind(context);
// ------------------------------
        //
        //
        // // API.getMarks({ categoryId: 1 }).then();

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filters: {},

            filtersData: {},

            data: [],
        };

        [
            'loadInitialFiltersData',
            'loadBodyStyles',
            'loadDataByMark',
            'handlePointClick',
        ].forEach(bind(this));
    }

    componentDidMount() {
        this.loadInitialFiltersData();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state.filters);

        const {
            main_category: newCategory,
            marka_id: newMarka,
            color_id: newColors,
        } = this.state.filters;

        const {
            main_category: oldCategory,
            marka_id: oldMarka,
            color_id: oldColors,
        } = prevState.filters;

        if (oldCategory !== newCategory) {
            this.loadBodyStyles();
            this.loadMarks();
        }

        if (oldColors !== newColors) {
            console.log('new color');
            this.loadDataByMark();
        }

        if (oldMarka !== newMarka) {
            console.log('new marka');
            this.loadMarkModels().then(() => this.loadDataByModel());
        }
    }

    updateFiltersData = name => data => this.setState(prevState => ({
        ...prevState,
        filtersData: {
            ...prevState.filtersData,
            [name]: data,
        },
    }));

    updateFilter = ({ name, value }) => this.setState(prevState => ({
        ...prevState,
        filters: {
            ...prevState.filters,
            [name]: value,
        },
    }));

    loadInitialFiltersData() {
        API.getCategories().then(this.updateFiltersData('categories'));
        API.getColors().then(this.updateFiltersData('colors'));
        API.getFuels().then(this.updateFiltersData('fuels'));
        API.getStates().then(this.updateFiltersData('states'));
    }

    loadBodyStyles() {
        API.getBodyStyles({
            categoryId: this.state.filters.main_category,
        }).then(this.updateFiltersData('bodyStyles'));
    }

    loadMarks() {
        API.getMarks({
            categoryId: this.state.filters.main_category,
        }).then(this.updateFiltersData('marks'));
    }

    loadMarkModels() {
        return API.getMarkModels({
            categoryId: this.state.filters.main_category,
            markId: this.state.filters.marka_id,
        }).then(this.updateFiltersData('models'));
    }

    // This function updates render data filtering and
    // enhancing incoming data with data-point specific
    // information
    updateRenderData = group => data => {
        // Just ignore all data where no data available
        if (data.total === 0 ||
            data.interQuartileMean === null ||
            data.interQuartileMean > 100000) {
            return;
        }

        // Using a function as we are relying on the
        // previous state, so this ensures we use the
        // latest one
        this.setState(prevState => ({
            data: [
                ...prevState.data,
                {
                    ...data,
                    group,
                },
            ],
        }));
    };

    // This function makes a bunch of requests using
    // current filters, list of options to traverse
    // and update current data
    loadData = (array, filterOption) => {
        const getData = value =>
            API.request({
                options: {
                    ...this.state.filters,
                    [filterOption]: value.value,
                }
            }).then(this.updateRenderData(value));

        this.setState({
            data: [],
        });

        return Promise.all(array.map(getData));
    }

    loadDataByMark() {
        this.loadData(this.state.filtersData.marks, 'marka_id');
    }

    loadDataByModel() {
        this.loadData(this.state.filtersData.models, 'model_id');
    }

    handlePointClick(value) {
        this.updateFilter({
            name: 'marka_id',
            value: value.group.value,
        });
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
                            width={ 1000 }
                            height={ 600 }
                            style={{
                                width: 1000,
                                height: 600,
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
                            <VictoryScatter
                                data={ this.state.data }
                                x="group.name"
                                y="interQuartileMean"
                                bubbleProperty="total"
                                scale="log"
                                labels={ data => `${data.group.name} - ${data.total} - ${data.interQuartileMean}` }
                                labelComponent={ <VictoryTooltip /> }
                                maxBubbleSize={ 30 }
                                dataComponent={ <ClickablePoint onClick={ this.handlePointClick } /> }
                                />
                        </VictoryChart>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

const ClickablePoint = props =>
    <Point
        { ...props }
        events={{
            onClick: () => props.onClick(props.datum),
        }}
        />;

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
        } = this.props;

        return (
            <div className="Filters">
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
            </div>
        );
    }
}

export default App;
