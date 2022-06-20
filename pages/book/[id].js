import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import moment from 'moment'

import SocialIconLinks from '/components/sociallinks'
import Calendar from '/components/calendar'
import Bookings from '/components/bookings'

import { apiGetDoctorInfo, apiGetBookings } from '/utils/api'

import doctors from '/mockup/doctors'
import bookings from '/mockup/bookings'

const BookPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [doctorInfo, setDoctorInfo] = useState({})
  const [bookingInfo, setBookingInfo] = useState([])

  const [selectedInfo, setSelectedInfo] = useState()

  const handleSelectDate = (info) => {
    setSelectedInfo(info)
  }

  const getDoctorInfo = async () => {
    try {
      const res = await apiGetDoctorInfo(id)
      setDoctorInfo(res)
    } catch {
      setDoctorInfo({})
    }
  }

  const getBookingInfo = async () => {
    try {
      const res = await apiGetBookings()
      res.filter((booking) => booking.doctorId == doctors[0].id)
      setBookingInfo(res)
    } catch {
      setBookingInfo([])
    }
  }

  useEffect(() => {
    getDoctorInfo()
    getBookingInfo()
  }, [id]) //eslint-disable-line

  return (
    <div>
      <div className='bg-primary-theme-color p-3 rounded-md flex justify-between items-center mb-10'>
        <div className='flex items-center gap-5'>
          <Image
            src='/doctors/doctor_3.png'
            alt='doctor'
            width='100px'
            height='130px'
            className='rounded-md border-4 border-white'
          />
          <h2 className='text-white'>Dr.Loyd Wilson</h2>
        </div>
        <div className='flex gap-2'>
          <SocialIconLinks type='twitter' />
          <SocialIconLinks type='facebook' />
          <SocialIconLinks type='google' />
          <SocialIconLinks type='instagram' />
        </div>
      </div>

      <div className='text-center'>
        <h4 className='text-primary-theme-color'>Book Now</h4>
        <h3>Make An Appointment To Book Your Seat</h3>
        <div className='flex flex-col lg:flex-row gap-10 mt-10'>
          <div className='w-full lg:w-7/12'>
            <Calendar
              onSelect={handleSelectDate}
              opening_hours={doctorInfo?.opening_hours}
            />
          </div>
          <div className='grow'>
            <Bookings
              data={[
                ...new Set(
                  bookingInfo?.filter((t) => t.date === selectedInfo?.date)
                ),
              ]}
              opening_hours={selectedInfo?.opening_hours}
              date={selectedInfo?.date}
              doctorId={id}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookPage
