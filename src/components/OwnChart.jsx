import Chart from "react-apexcharts"
import Notification from "./Notification"

import getChartInfo from "./ChartFacade"

const OwnChart = (props) => {
  const {errorMessage, options, series} = getChartInfo(props)
  const chartType = props.chartType

  return (
    <div data-testid="own-chart" className={chartType}>
      {!errorMessage 
      ? <Chart
          key={chartType}
          options={options}
          series={series}
          type={chartType}
          height="400"
        />
      : <Notification message={errorMessage} />}
    </div>
  )
}

export default OwnChart