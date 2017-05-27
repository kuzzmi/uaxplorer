/*
 * What car to buy?
 *
 * 1. I want to see a chart with:
 *      Manufacturer/Count -> Manufacturer+Model/Count
 *      To do this I need:
 *      1. get list of car manufacturers
 *      2. get list of average prices for each manufacturer and count of offers
 */

import React, { Component } from 'react';
import './App.scss';
import {
    VictoryScatter,
    VictoryChart,
    VictoryTheme,
    VictoryAxis,
} from 'victory';

// TODO: Move to separate service
const processRequest = data => data.json();
const baseUrl = 'http://api.auto.ria.com/';

const API = {
    request: options => fetch(baseUrl + options).then(processRequest),
};
// ------------------------------

// TODO: Move to helpers
const normalize = name => array => array.reduce((acc, obj) => ({ ...acc, [obj[name]]: obj }), {});

const getByMark = mark => API.request(`average?marka_id=${ mark.value }`);
// ------------------------------

        // API.request('average?marka_id=79')
        //     .then(data => {
        //         const {
        //             prices,
        //             percentiles,
        //         } = data;
        //
        //         const percentilesToRender = Object.keys(percentiles).map(k => ({
        //             x: k,
        //             y: percentiles[k],
        //         }));
        //
        //         const pricesToRender =
        //             prices.map(a => parseInt(a, 10))
        //                   .sort((a, b) => a > b ? 1 : -1)
        //                   .map((p, i) => ({ x: i, y: p }));
        //
        //         this.setState({
        //             percentiles: percentilesToRender,
        //             prices: pricesToRender,
        //         });
        //     });

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    componentDidMount() {

        const getMarkData = m =>
            getByMark(m).then(data => {
                this.setState(prevState => ({
                    data: [
                        ...prevState.data,
                        {
                            manufacturer: m.name,
                            ...data,
                        },
                    ],
                }));
            });

        API.request('categories/1/marks')
            .then(marks => Promise.all(marks.map(getMarkData)));
    }

    render() {
        return (
            <div className="App">
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
                        style={{
                            tickLabels: {
                                fontSize: 10,
                            },
                        }}
                        />
                    <VictoryScatter
                        data={ this.state.data }
                        x="manufacturer"
                        y="interQuartileMean"
                        bubbleProperty="total"
                        maxBubbleSize={ 10 }
                        />
                </VictoryChart>
            </div>
        );
    }
}

export default App;
