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
    VictoryBar,
    VictoryChart,
    VictoryTheme,
    VictoryAxis,
} from 'victory';

import API from './api.js';

// TODO: Move to helpers
const normalize = name => array => array.reduce((acc, obj) => ({ ...acc, [obj[name]]: obj }), {});
// ------------------------------

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    componentDidMount() {

        const getMarkData = m =>
            API.getByMark(m).then(data => {

                // Just ignore all data where no options
                // available
                if (data.total === 0) {
                    return;
                }

                // Using a function as we are relying on the
                // previous state, so this ensures we use the
                // latest one
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

        API.getMarks({
            categoryId: 1,
        }).then(marks => Promise.all(marks.slice(0, 50).map(getMarkData)));
    }

    render() {
        return (
            <div className="App">
                <VictoryChart
                    theme={ VictoryTheme.material }
                    height={ 300 }
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
        );
    }
}

                        // bubbleProperty="total"
                        // maxBubbleSize={ 10 }

export default App;
