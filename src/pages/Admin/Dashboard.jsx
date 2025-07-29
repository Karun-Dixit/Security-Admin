import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full'>

      {/* Full Width Container */}
      <div className='w-full h-full p-6'>

        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>Admin Dashboard</h1>
          <p className='text-gray-600'>Welcome back! Here's what's happening with your clinic today.</p>
        </div>

        {/* Stats Cards - Full Width Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8 mb-8 w-full'>
          {/* Doctors Card */}
          <div className='group bg-white p-8 rounded-2xl shadow-lg border border-blue-100 cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-4xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300'>{dashData.doctors}</p>
                <p className='text-gray-600 font-medium mt-2 text-lg'>Total Doctors</p>
                <div className='w-16 h-1 bg-blue-500 rounded-full mt-3 group-hover:w-20 transition-all duration-300'></div>
              </div>
              <div className='bg-blue-100 p-5 rounded-full group-hover:bg-blue-200 transition-colors duration-300'>
                <img className='w-10 h-10 group-hover:scale-110 transition-transform duration-300' src={assets.doctor_icon} alt="" />
              </div>
            </div>
          </div>

          {/* Appointments Card */}
          <div className='group bg-white p-8 rounded-2xl shadow-lg border border-green-100 cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-4xl font-bold text-green-600 group-hover:text-green-700 transition-colors duration-300'>{dashData.appointments}</p>
                <p className='text-gray-600 font-medium mt-2 text-lg'>Appointments</p>
                <div className='w-16 h-1 bg-green-500 rounded-full mt-3 group-hover:w-20 transition-all duration-300'></div>
              </div>
              <div className='bg-green-100 p-5 rounded-full group-hover:bg-green-200 transition-colors duration-300'>
                <img className='w-10 h-10 group-hover:scale-110 transition-transform duration-300' src={assets.appointments_icon} alt="" />
              </div>
            </div>
          </div>

          {/* Patients Card */}
          <div className='group bg-white p-8 rounded-2xl shadow-lg border border-purple-100 cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-4xl font-bold text-purple-600 group-hover:text-purple-700 transition-colors duration-300'>{dashData.patients}</p>
                <p className='text-gray-600 font-medium mt-2 text-lg'>Total Patients</p>
                <div className='w-16 h-1 bg-purple-500 rounded-full mt-3 group-hover:w-20 transition-all duration-300'></div>
              </div>
              <div className='bg-purple-100 p-5 rounded-full group-hover:bg-purple-200 transition-colors duration-300'>
                <img className='w-10 h-10 group-hover:scale-110 transition-transform duration-300' src={assets.patients_icon} alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* Latest Bookings - Full Width */}
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden w-full'>
          {/* Header */}
          <div className='bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-5'>
            <div className='flex items-center gap-3'>
              <div className='bg-white bg-opacity-20 p-3 rounded-lg'>
                <img className='w-6 h-6' src={assets.list_icon} alt="" />
              </div>
              <h3 className='text-white font-semibold text-xl'>Latest Bookings</h3>
            </div>
          </div>

          {/* Bookings List */}
          <div className='divide-y divide-gray-100'>
            {dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div
                className='flex items-center px-8 py-6 hover:bg-blue-50 transition-colors duration-200 group w-full'
                key={index}
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Doctor Image */}
                <div className='relative flex-shrink-0'>
                  <img
                    className='w-14 h-14 rounded-full object-cover border-2 border-gray-200 group-hover:border-blue-300 transition-colors duration-200'
                    src={item.docData.image}
                    alt=""
                  />
                  <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full'></div>
                </div>

                {/* Appointment Info - Takes up remaining space */}
                <div className='flex-1 ml-6'>
                  <p className='text-gray-800 font-medium group-hover:text-blue-700 transition-colors duration-200 text-lg'>
                    {item.docData.name}
                  </p>
                  <p className='text-gray-500 mt-1'>
                    Booking on {slotDateFormat(item.slotDate)}
                  </p>
                </div>

                {/* Status/Action */}
                <div className='ml-6 flex-shrink-0'>
                  {item.cancelled ? (
                    <span className='inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-700'>
                      <span className='w-2 h-2 bg-red-500 rounded-full mr-2'></span>
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className='inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-700'>
                      <span className='w-2 h-2 bg-green-500 rounded-full mr-2'></span>
                      Completed
                    </span>
                  ) : (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className='p-3 rounded-full hover:bg-red-100 transition-colors duration-200 group/btn'
                      title='Cancel Appointment'
                    >
                      <img
                        className='w-6 h-6 group-hover/btn:scale-110 transition-transform duration-200'
                        src={assets.cancel_icon}
                        alt="Cancel"
                      />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Empty State */}
            {dashData.latestAppointments.length === 0 && (
              <div className='text-center py-16'>
                <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <img className='w-10 h-10 opacity-50' src={assets.appointments_icon} alt="" />
                </div>
                <p className='text-gray-500 text-lg'>No recent bookings</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add custom CSS for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default Dashboard