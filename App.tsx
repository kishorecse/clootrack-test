import React, { Component } from 'react';
import Chart, { ChartData } from './Chart';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { fetchChartsWithRedux, randomDataUpdate } from './redux';
import './style.css';

interface AppProps {
  fetchChartsWithRedux: Function;
  randomDataUpdate: Function;
  chartsList: ChartData[];
  loading: boolean;
}
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
    };
  }

  componentDidMount() {
    this.props.fetchChartsWithRedux();
    setInterval(() => {
      this.props.randomDataUpdate();
      this.forceUpdate();
    }, 1000);
  }

  render() {
    return (
      <div className="flex-container">
        {this.props.loading && (
          <div className="center-loader">
            <Loader />
          </div>
        )}
        {this.props.chartsList &&
          this.props.chartsList.map((chart) => (
            <div className="chart">
              <Chart {...chart} />
            </div>
          ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chartsList: state.chartsList,
    loading: state.loading,
  };
}

export default connect(mapStateToProps, {
  fetchChartsWithRedux,
  randomDataUpdate,
})(App);
