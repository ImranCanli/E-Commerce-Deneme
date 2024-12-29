"use client"

import React, { useEffect, useState } from 'react'

import classes from './index.module.scss'

const Promotion = () => {

    const [time, setTime] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 3) //Bu günden itibaren kaç gün sürmesi isteniyorsa "setDate"in 2. parametresini o rakamda değiştirilir.
  
    useEffect(() => {
      const timerInterval = setInterval(() => {
        const currentTime = new Date()
        const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0)
  
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)
  
        setTime({ days, hours, minutes, seconds })
  
        if (timeDifference === 0) {
          clearInterval(timerInterval)
          // You can add code here to handle what happens when the target date is reached.
        }
      }, 1000)
  
      return () => {
        clearInterval(timerInterval) // Cleanup the interval when the component unmounts.
      }
    }, [])

  return (
    <section className={classes.promotion}>
        <div className={classes.textBox}>
            <h3 className={classes.title}>Bu ayın fırsatları</h3>
            <p>Bu ay, en sevilen ürünlerde özel indirimler sizi bekliyor! Sınırlı süreli fırsatlarla hem kaliteyi hem de uygun fiyatı yakalayın. Stoklarla sınırlı olan bu kampanyaları kaçırmayın!</p>
             <ul className={classes.stats}>
                <StatBox  label='Gün' value={time.days}/>
                <StatBox  label='Saat' value={time.hours}/>
                <StatBox  label='Dakika' value={time.minutes}/>
                <StatBox  label='Saniye' value={time.seconds}/>
             </ul>
        </div>
    </section>
  )
}

const StatBox = ({label, value} : { label: string, value: number}) => (
    <li className={classes.statBox}>
        <h4>{value}</h4>
        <p>{label}</p>
    </li>
)

export default Promotion
