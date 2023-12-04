import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import SplitLongStrings from '../functions/SplitLongStrings'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const RadarChart = ({ categories, results }) => {
  const data = {
    labels: SplitLongStrings(categories, 20),
    datasets: [
      {
        label: 'Tulokset',
        data: results,
        backgroundColor: 'rgba(132, 99, 255, 0.2)',
        borderColor: 'rgba(132, 99, 255, 1)',
        borderWidth: 2,
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    devicePixelRatio: 1.5,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      r: {
        angleLines: {
          color: 'gray'
        },
        grid: {
          color: 'gray'
        },
        min: -6,
        max: 6,
        ticks: {
          display: false
        },
        pointLabels: {
          font: function(context) {
            var width = context.chart.width
            var size = Math.round(width / 32)
            return {
              weight: 'bold',
              size: size
            }
          }
        }
      }
    }
  }
  return (
    <div style= { { width: '600px', height: '600px' } }>
      <Radar data={data} options={options} id="radarchart" className="radarchart" aria-label='radar chart'/>
    </div>
  )
}

export default RadarChart
