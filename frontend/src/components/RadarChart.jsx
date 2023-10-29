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
import splitLongStrings from '../functions/splitLongStrings'
import '../assets/RadarChart.css'

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
    labels: splitLongStrings(categories, 20),
    datasets: [
      {
        label: 'Tulokset',
        data: results,
        backgroundColor: 'rgba(132, 99, 255, 0.2)',
        borderColor: 'rgba(132, 99, 255, 1)',
        borderWidth: 1,
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      r: {
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
    <div>
      <Radar data={data} options={options} id="radarchart" className="radarchart" aria-label='radar chart'/>
    </div>
  )
}

export default RadarChart
