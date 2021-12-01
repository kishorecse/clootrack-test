import React, { Component } from 'react';
import Chart, { ChartData } from './Chart';
import Loader from 'react-loader-spinner';

import './style.css';

interface AppProps {}
interface AppState {
  name: string;
  chartsList: ChartData[];
  loading: boolean;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
      chartsList: [],
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const chartsData = await fetch(
        'https://s3-ap-southeast-1.amazonaws.com/he-public-data/chart2986176.json'
      );
      const chartDataJson: ChartData[] = await chartsData.json();
      this.setState({
        chartsList: chartDataJson,
        loading: false,
      });
    } catch (e) {
      console.log(e);
      this.setState({
        loading: false,
      });
    }
  }

  getState = () => {
    const { chartsList, loading } = this.state;

    return {
      chartsList,
      loading,
    };
  };

  render() {
    const { chartsList, loading } = this.getState();
    return (
      <div className="flex-container">
        {loading && (
          <div className="center-loader">
            <Loader />
          </div>
        )}
        {chartsList &&
          chartsList.map((chart) => (
            <div className="chart">
              <Chart {...chart} />
            </div>
          ))}
      </div>
    );
  }
}

export default App;
