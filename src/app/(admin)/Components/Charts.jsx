'use client'
import AreaChartPlot from './AreaChartPlot'
const Charts = () => {
  return (
    <>
      <section className="flex my-4 px-4 gap-3">
        <div className="w-full h-[600px] bg-[#FBFBFB] rounded-xl">
          <AreaChartPlot />
        </div>
      </section>
    </>
  )
}

export default Charts
