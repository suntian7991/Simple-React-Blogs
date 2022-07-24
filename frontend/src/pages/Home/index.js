import Bar from "@/components/Bar"
import './index.scss'

const Home = () => {
  return (
    <div className="home">
      <Bar
        name="Frameworks Satisfaction"
        style={{ width: '360px', height: '400px' }}
        xData={['vue', 'angular', 'react']}
        yData={[50, 60, 70]}
        title='Frameworks satisfaction' />

      <Bar
        name="Frameworks Application"
        style={{ width: '360px', height: '400px' }}
        xData={['vue', 'angular', 'react']}
        yData={[50, 60, 70]}
        title='Frameworks Application' />
    </div>
  )
}
export default Home