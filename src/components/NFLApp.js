//blue #0D254C;
//silver (#D6D6D6);
//red (#C80815);
import React from 'react'
import AppHeader from '../components/AppHeader'
import ChartContainer from '../components/ChartContainer'
import ChartOptions from '../components/ChartOptions'

const NFLApp = props => {
  return(
    <div className='nflapp'>
      <AppHeader/>
      <section className='main'>
        <ChartOptions />
        <ChartContainer />
      </section>
    </div>
  )
}

export default NFLApp
