/*
 * What car to buy?
 */

import React, { Component } from 'react';
import 'basscss/css/basscss.css';
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
            filters: {
                color_id: [15, 3],
            },

            filtersData: {
                categories: [{
                    name: 'Легковые',
                    value: 1,
                }, {
                    name: 'Мото',
                    value: 2,
                }, {
                    name: 'Водный транспорт',
                    value: 3,
                }, {
                    name: 'Спецтехника',
                    value: 4,
                }, {
                    name: 'Прицеп',
                    value: 5,
                }, {
                    name: 'Грузовик',
                    value: 6,
                }, {
                    name: 'Автобус',
                    value: 7,
                }, {
                    name: 'Автодом',
                    value: 8,
                }, {
                    name: 'Воздушный транспорт',
                    value: 9,
                }],
                colors: [{
                    name: 'Бежевый',
                    value: 1,
                }, {
                    name: 'Черный',
                    value: 2,
                }, {
                    name: 'Синий',
                    value: 3,
                }, {
                    name: 'Бронзовый',
                    value: 4,
                }, {
                    name: 'Коричневый',
                    value: 5,
                }, {
                    name: 'Золотой',
                    value: 6,
                }, {
                    name: 'Зеленый',
                    value: 7,
                }, {
                    name: 'Серый',
                    value: 8,
                }, {
                    name: 'Апельсин',
                    value: 9,
                }, {
                    name: 'Магнолии',
                    value: 10,
                }, {
                    name: 'Розовый',
                    value: 11,
                }, {
                    name: 'Фиолетовый',
                    value: 12,
                }, {
                    name: 'Красный',
                    value: 13,
                }, {
                    name: 'Серебряный',
                    value: 14,
                }, {
                    name: 'Белый',
                    value: 15,
                }, {
                    name: 'Желтый',
                    value: 16,
                }, {
                    name: 'Голубой',
                    value: 17,
                }, {
                    name: 'Вишнёвый',
                    value: 18,
                }, {
                    name: 'Сафари',
                    value: 19,
                }, {
                    name: 'Гранатовый',
                    value: 20,
                }, {
                    name: 'Асфальт',
                    value: 21,
                }],
                fuels: [{
                    name: 'Бензин',
                    value: 1,
                }, {
                    name: 'Дизель',
                    value: 2,
                }, {
                    name: 'Газ',
                    value: 3,
                }, {
                    name: 'Газ/бензин',
                    value: 4,
                }, {
                    name: 'Гибрид',
                    value: 5,
                }, {
                    name: 'Электро',
                    value: 6,
                }, {
                    name: 'Другое',
                    value: 7,
                }, {
                    name: 'Газ метан',
                    value: 8,
                }, {
                    name: 'Газ пропан-бутан',
                    value: 9,
                }],
                states: [{
                    name: 'Винницкая',
                    value: 1,
                }, {
                    name: 'Волынская',
                    value: 18,
                }, {
                    name: 'Днепропетровская',
                    value: 11,
                }, {
                    name: 'Донецкая',
                    value: 13,
                }, {
                    name: 'Житомирская',
                    value: 2,
                }, {
                    name: 'Закарпатская',
                    value: 22,
                }, {
                    name: 'Запорожская',
                    value: 14,
                }, {
                    name: 'Ивано-Франковская',
                    value: 15,
                }, {
                    name: 'Киевская',
                    value: 10,
                }, {
                    name: 'Кировоградская',
                    value: 16,
                }, {
                    name: 'Луганская',
                    value: 17,
                }, {
                    name: 'Львовская',
                    value: 5,
                }, {
                    name: 'Николаевская',
                    value: 19,
                }, {
                    name: 'Одесская',
                    value: 12,
                }, {
                    name: 'Полтавская',
                    value: 20,
                }, {
                    name: 'Республика Крым',
                    value: 21,
                }, {
                    name: 'Ровенская',
                    value: 9,
                }, {
                    name: 'Сумская',
                    value: 8,
                }, {
                    name: 'Тернопольская',
                    value: 3,
                }, {
                    name: 'Харьковская',
                    value: 7,
                }, {
                    name: 'Херсонская',
                    value: 23,
                }, {
                    name: 'Хмельницкая',
                    value: 4,
                }, {
                    name: 'Черкасская',
                    value: 24,
                }, {
                    name: 'Черниговская',
                    value: 6,
                }, {
                    name: 'Черновицкая',
                    value: 25,
                }],
            },

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
        // this.loadInitialFiltersData();
    }

    componentDidUpdate(prevProps, prevState) {
        // eslint-disable-next-line
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
            // eslint-disable-next-line
            console.log('new color');
            // this.loadDataByMark();
        }

        if (oldMarka !== newMarka) {
            // eslint-disable-next-line
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
                },
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
                        selected={ this.state.filters }
                        onFilterUpdate={ this.updateFilter }
                        onApplyFiltersClick={ this.applyFilters }
                        onResetFiltersClick={ this.resetFilters }
                        />
                    <Chart
                        data={ this.state.data }
                        onClick={ this.handlePointClick }
                        />
                </div>
                <Footer />
            </div>
        );
    }
}

const Chart = ({
    data,
    onClick,
}) => (
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
                data={ data }
                x="group.name"
                y="interQuartileMean"
                bubbleProperty="total"
                scale="log"
                labels={ data => `Model: ${data.group.name}\r\nTotal: ${data.total}\r\nInterquartile Mean: ${~~data.interQuartileMean}` }
                labelComponent={ <VictoryTooltip /> }
                maxBubbleSize={ 30 }
                dataComponent={ <ClickablePoint onClick={ onClick } /> }
                />
        </VictoryChart>
    </div>
);

const ClickablePoint = props =>
    <Point
        { ...props }
        events={{
            ...props.events,
            onClick: () => props.onClick(props.datum),
        }}
        />;

export default App;
