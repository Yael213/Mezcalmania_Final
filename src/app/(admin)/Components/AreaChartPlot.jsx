import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useState, useEffect } from 'react'

const AreaChartPlot = () => {
  const [orders, setOrders] = useState([])

  console.log(orders)

  useEffect(() => {
    getOrders()
  }, [])

  const getOrders = async () => {
    try {
      const response = await fetch('/api/orders/')
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const data = [
    {
      year: '2016',
      Iphone: 4000,
      Samsung: 2400,
    },
    {
      year: '2017',
      Iphone: 3000,
      Samsung: 1398,
    },
    {
      year: '2018',
      Iphone: 2000,
      Samsung: 9800,
    },
    {
      year: '2019',
      Iphone: 2780,
      Samsung: 3908,
    },
    {
      year: '2020',
      Iphone: 1890,
      Samsung: 4800,
    },
    {
      year: '2021',
      Iphone: 2390,
      Samsung: 3800,
    },
    {
      year: '2022',
      Iphone: 3490,
      Samsung: 4300,
    },
  ]

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={730}
          height={250}
          data={orders}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7B0546" stopOpacity={0.8} />
              <stop offset="90%" stopColor="#7B0546" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="fecha" />
          <YAxis datakey="$" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#790344"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

export default AreaChartPlot
