import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { getRandomColor } from './utils';

export interface ChartData {
  type: 'Pie' | 'Bar';
  elements: Number[];
}

const chartOptions = {
  maintainAspectRatio: false,
};

const Chart = (props: ChartData) => {
  const { type, elements } = props;

  const generateRandomColors = () => {
    if (!elements) {
      return [];
    }

    const randomColors = [];
    for (let i = 0; i < elements.length; i++) {
      randomColors.push(getRandomColor());
    }

    return randomColors;
  };

  const getData = () => {
    switch (type) {
      case 'Pie':
        return {
          datasets: [
            {
              data: elements,
              backgroundColor: generateRandomColors(),
            },
          ],
        };
      default:
        return {
          labels: elements,
          datasets: [
            {
              label: type,
              data: elements,
              backgroundColor: generateRandomColors(),
            },
          ],
        };
    }
  };

  const renderComponent = () => {
    switch (type) {
      case 'Pie':
        return <Pie options={chartOptions} data={getData()} />;
      case 'Bar':
        return <Bar options={chartOptions} data={getData()} />;
    }
  };
  return <React.Fragment>{renderComponent()}</React.Fragment>;
};

export default Chart;
