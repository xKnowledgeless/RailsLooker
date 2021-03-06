import React, { Component } from "react"
import TrainsList from "../TrainsList/index"
import TrainsMap from "../TrainsMap"
import SomeTrainFullInfo from "../SomeTrainFullInfo"
import scrollIt from "./animation"
import socketIOClient from "socket.io-client"
import logo from "../../img/logo.png"
import "./App.css"



class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            db: [],
            window: true,
            trainsList : [],
            activeTrain : null
        };
    }

    componentDidMount() {
        const socket = socketIOClient("http://localhost:3000");

        socket.on("db", data => {
            const trains = [...JSON.parse(data)]
                .map(train => {
                    train.number = train.number + "";
                    train.type = (train.type === 1) ? "Грузовой" : "Пассажирский";
                    train.route = train.dep.place + "-" + train.arr.place;
                    train.status = (train.status) ? "Прибыл" : "В пути";

                    return train;
                });

        const filterDb = () => {
            const newTrainList = [];

            if (!this.state.trainsList.length) {
                return trains;
            }

            this.state.trainsList.forEach(trainInList => {
                trains.forEach(trainInDb => {
                    if (trainInDb.number === trainInList.number) {
                        newTrainList.push(trainInDb);
                    }
                });
            });

            return newTrainList;
        };

            this.setState({
                db: trains,
                trainsList: filterDb()
            });
        });
    };

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
                    <div className="logo">
                        <img src={logo} alt="Подмаско Константин" className="logo__item"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <TrainsMap
                            trains = { this.state.trainsList }
                            activeTrain = { this.activeTrainInfo(this.state.trainsList, this.state.activeTrain) }
                        />
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <TrainsList
                            trains = { this.state.trainsList }
                            activeTrain = { this.state.activeTrain }
                            activeTrainSwitcher = { this.changeActiveTrain }
                            listWatcher = { this.changeTrainsList }
                        />
                    </div>
                </div>
                <div className={ (this.state.window) ? "row hide" : "row" }>
                    <div className="col-xs-12">
                        <SomeTrainFullInfo
                            { ...this.activeTrainInfo(this.state.trainsList, this.state.activeTrain) }
                            closeFullInfo = { this.closeFullInfo.bind(this) }
                        />
                    </div>
                </div>
            </div>
        )
    }

    activeTrainInfo = (list, active) => list.find((train) => {
        return train.number === active
    });

    changeActiveTrain = newActiveNumber => {
        this.setState({
            activeTrain : newActiveNumber,
            window: false
        });
        setTimeout(() => scrollIt(50000), 0);
    };

    closeFullInfo = () => {
        this.setState({
            window: true,
            activeTrain: null
        })
    };

    changeTrainsList = fields => {
        let newTrainsList = [];

        if (!fields.name &&
            !fields.number &&
            !fields.route &&
            !fields.status) {
            newTrainsList = this.state.db;
        } else {
            for (let train of this.state.db) {
                if (this.checkOneTrain(train, fields)) {
                    newTrainsList.push(train);
                }
            }
        }

        let activeTrain = this.activeTrainInfo(newTrainsList, this.state.activeTrain);
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

            let trainfield = train[field].toLowerCase();
            let inputfield = fields[field].toLowerCase();

            if (trainfield.indexOf(inputfield) === -1) {
                return false;
            }
        }
        return true;
    }

}

export default App;