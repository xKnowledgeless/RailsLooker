import React, { Component } from "react"
import TrainsList from "./TrainsList"
import TrainsMap from "./TrainsMap"
import SomeTrainFullInfo from "./SomeTrainFullInfo"
import "../css/App.css"
import trains from "./db"

class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            window: true,
            trainsList : trains,
            activeTrain : null
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.window !== nextState.window) {
            return true;
        }

        if (this.state.activeTrain !== nextState.activeTrain) {
            return true;
        }

        if (this.state.trainsList !== nextState.trainsList) {
            return true;
        }

        return false;
    }

    render() {
        return (
            <div className="App container">
                <div className="row">
                    <div className="item item-6">
                        <TrainsMap
                            trains = { this.state.trainsList }
                            activeTrain = { this.state.trainsList.find((train) => {
                                return train.number === this.state.activeTrain
                            }) }
                        />
                    </div>
                    <div className="item item-6">
                        <TrainsList
                            trains = { this.state.trainsList }
                            activeTrain = { this.state.activeTrain }
                            activeTrainSwitcher = { this.changeActiveTrain }
                            listWatcher = { this.changeTrainsList }
                        />
                    </div>
                </div>
                <div className={ (this.state.window) ? "row hide" : "row" }>
                    <div className="item item-12">
                        <SomeTrainFullInfo { ...this.state.trainsList.find((train) => {
                            return train.number === this.state.activeTrain
                        }) }
                        closeFullInfo = { this.closeFullInfo.bind(this) }
                        />
                    </div>
                </div>
            </div>
        )
    }

    changeActiveTrain = (newActiveNumber) => {
        this.setState({
            activeTrain : newActiveNumber,
            window: false
        });
    };

    closeFullInfo() {
        this.setState({
            window: true,
            activeTrain: null
        })
    }

    changeTrainsList = (fields) => {
        let newTrainsList = [];

        if (!fields.name &&
            !fields.number &&
            !fields.route &&
            !fields.status) {
            newTrainsList = trains;
        } else {
            for (let train of trains) {
                if (this.checkOneTrain(train, fields)) {
                    newTrainsList.push(train);
                }
            }
        }
        let activeTrain = (newTrainsList.length) ? this.state.activeTrain : null;
        if (!activeTrain) {
            this.closeFullInfo();
        }


        this.setState({
            trainsList: newTrainsList,
            activeTrain : activeTrain
        })
    };

    checkOneTrain = (train, fields) => {
        for (let field of Object.keys(fields)) {
            if (!fields[field]) {
                continue;
            }

            if (train[field].indexOf(fields[field]) === -1) {
                return false;
            }
        }
        return true;
    }
}

export default App;