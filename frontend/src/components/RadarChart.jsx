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
  const splitLongStrings = (arr, maxLength) => {
    return arr.map((str) => {
      if (str.length <= maxLength) {
        return [str] //**If the string is shorter than or equal to maxLength, no splitting needed */
      }
      const chunks = []
      let start = 0
      while (start < str.length) {
        let end = start + maxLength

        //**Adjust the end index to the last space within the maxLength */
        while (end > start && str[end] !== ' ' && str[end] !== undefined) {
          end--
        }

        const chunk = str.substring(start, end).trim()
        if (chunk.length > 0) {
          chunks.push(chunk)
        }
        start = end + 1 //** Move start to the next character after the space */
      }

      return chunks
    })
  }

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
  return <Radar data={data} options={options} className="radarchart" />
}

export default RadarChart
