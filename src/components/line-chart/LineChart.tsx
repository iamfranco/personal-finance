import { CategoryScale, Chart as ChartJS, LineElement, LinearScale, PointElement, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2"
import { numberDisplayService } from "../../services/number-display-service/numberDisplayService";
import { useContext } from "react";
import { DarkThemeContext } from "../../App";

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
  const {isDarkTheme} = useContext(DarkThemeContext);

  const getColor = (key: string) => getComputedStyle(document.documentElement)
    .getPropertyValue(isDarkTheme ? `${key}-dark` : key);

  const colors = {
    primaryColor: getColor('--chart-primary-color'),
    secondaryColor: getColor('--chart-secondary-color'),
    textColor: getColor('--chart-text-color'),
    gridLineColor: getColor('--chart-grid-line-color')
  }

  const x = y1.map((_, i) => i);

  const data = {
    labels: x,
    datasets: [
      {
        data: y1,
        borderColor: colors.primaryColor,
        backgroundColor: `${colors.primaryColor}99`,
        borderWidth: 3,
        pointRadius: 2,
      },
      {
        data: y2,
        borderColor: colors.secondaryColor,
        backgroundColor: `${colors.secondaryColor}99`,
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
              text: 'Year',
              color: colors.textColor,
              align: 'end'
            },
            ticks: {
              color: colors.textColor
            },
            grid: {
              color: colors.gridLineColor
            },
          },
          y: {
            ticks: {
              color: colors.textColor,
              callback: (tickValue) => numberDisplayService.getNumberShortString(tickValue as number)
            },
            grid: {
              color: colors.gridLineColor
            },
          }
        }
      }}
      data={data}
    />
  )
}

export default LineChart