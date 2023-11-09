import { CategoryScale, Chart as ChartJS, LineElement, LinearScale, PointElement, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2"
import { numberDisplayService } from "../../services/number-display-service/numberDisplayService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
);

interface Props {
  y1: number[],
  y2: number[]
}

const LineChart = ({y1, y2}: Props) => {

  const x = y1.map((_, i) => i);

  const data = {
    labels: x,
    datasets: [
      {
        data: y1,
        borderColor: '#FF9130',
        backgroundColor: '#FF913099',
        borderWidth: 3,
        pointRadius: 2,
      },
      {
        data: y2,
        borderColor: '#1D70B8',
        backgroundColor: '#1D70B899',
        borderWidth: 2,
        pointRadius: 1.5,
      },
    ],
  };

  return (
    <Line 
      options={{
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              title: (items) => {
                return 'Year ' + items[0].label;
              },
              label: (item) => {
                return numberDisplayService.toCurrencyFormat(item.raw as number);
              }
            }
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Year'
            }
          },
          y: {
            ticks: {
              callback: (tickValue) => numberDisplayService.getNumberShortString(tickValue as number)
            }
          }
        }
      }}
      data={data}
    />
  )
}

export default LineChart