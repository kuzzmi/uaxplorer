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

import API from '../../services/api.js';
import Footer from '../footer';
import Header from '../header';
import Filters from '../filters';
import { bind } from '../../utils.js';

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
            'applyFilters',
            'resetFilters',
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

    // Updates data used for filter inputs.
    // name represents a key under which the data will be preserved
    // data is ... data
    updateFiltersData = name => data => this.setState(prevState => ({
        ...prevState,
        filtersData: {
            ...prevState.filtersData,
            [name]: data,
        },
    }));

    // Updates fiters that will be applied to the API URL
    // name is API compatible filter name
    // value is value
    // TODO: add multiple filters add/remove functionality
    updateFilter = ({ name, value }) => this.setState(prevState => ({
        ...prevState,
        filters: {
            ...prevState.filters,
            [name]: value,
        },
    }));

    // Populates inputs on application start
    loadInitialFiltersData() {
        API.getCategories().then(this.updateFiltersData('categories'));
        API.getColors().then(this.updateFiltersData('colors'));
        API.getFuels().then(this.updateFiltersData('fuels'));
        API.getStates().then(this.updateFiltersData('states'));
    }

    // When we have a category selected we can load body types
    loadBodyStyles() {
        API.getBodyStyles({
            categoryId: this.state.filters.main_category,
        }).then(this.updateFiltersData('bodyStyles'));
    }

    // ...and manufacturers
    loadMarks() {
        API.getMarks({
            categoryId: this.state.filters.main_category,
        }).then(this.updateFiltersData('marks'));
    }

    // When manufacturer is selected we can query its models
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

    applyFilters() {
        if (!!this.state.filters.marka_id) {
            this.loadDataByModel();
        } else {
            this.loadDataByMark();
        }
    }

    resetFilters() {
        this.setState(prevState => ({
            ...prevState,
            filters: {},
        }));
    }

    handlePointClick(value) {
        this.updateFilter({
            name: 'marka_id',
            value: value.group.value,
        });
    }

    render() {
        return (
            <div className="App flex flex-column">
                <Header />
                <div className="body mx2">
                    <Filters
                        options={ this.state.filtersData }
                        onFilterUpdate={ this.updateFilter }
                        onApplyFiltersClick={ this.applyFilters }
                        onResetFiltersClick={ this.resetFilters }
                        />
                    <div className="hide">
                        <VictoryChart
                            theme={ VictoryTheme.material }
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
                                labels={ data => `Model: ${data.group.name}\r\nTotal: ${data.total}\r\nInterquartile Mean: ${~~data.interQuartileMean}` }
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
            ...props.events,
            onClick: () => props.onClick(props.datum),
        }}
        />;

export default App;
