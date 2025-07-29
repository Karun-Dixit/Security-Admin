import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full'>

      {/* Full Width Container */}
      <div className='w-full h-full p-6'>

        {/* Header Section */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>All Appointments</h1>
          <div className='flex items-center justify-between'>
            <p className='text-gray-600'>Manage and view all patient appointments</p>
            <div className='bg-blue-100 px-4 py-2 rounded-full'>
              <span className='text-blue-700 font-medium'>{appointments.length} Total Appointments</span>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden w-full'>

          {/* Table Header */}
          <div className='bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-5'>
            <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-4 text-white font-semibold text-sm'>
              <p>#</p>
              <p>Patient</p>
              <p>Age</p>
              <p>Date & Time</p>
              <p>Doctor</p>
              <p>Fees</p>
              <p>Action</p>
            </div>
          </div>

          {/* Table Body */}
          <div className='max-h-[70vh] overflow-y-auto'>
            {appointments.length === 0 ? (
              <div className='text-center py-16'>
                <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <img className='w-10 h-10 opacity-50' src={assets.appointments_icon} alt="" />
                </div>
                <p className='text-gray-500 text-lg'>No appointments found</p>
              </div>
            ) : (
              appointments.map((item, index) => (
                <div
                  className='flex flex-wrap justify-between max-sm:gap-3 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-600 py-4 px-8 border-b border-gray-100 hover:bg-blue-50 transition-all duration-200 group'
                  key={index}
                  style={{
                    animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both`
                  }}
                >
                  {/* Index */}
                  <p className='max-sm:hidden text-gray-400 font-medium'>#{index + 1}</p>

                  {/* Patient Info */}
                  <div className='flex items-center gap-3'>
                    <div className='relative'>
                      <img
                        src={item.userData.image}
                        className='w-10 h-10 rounded-full object-cover border-2 border-gray-200 group-hover:border-blue-300 transition-colors duration-200'
                        alt=""
                      />
                      <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full'></div>
                    </div>
                    <div>
                      <p className='font-medium text-gray-800 group-hover:text-blue-700 transition-colors duration-200'>
                        {item.userData.name}
                      </p>
                      <p className='text-xs text-gray-500 sm:hidden'>Age: {calculateAge(item.userData.dob)}</p>
                    </div>
                  </div>

                  {/* Age */}
                  <p className='max-sm:hidden text-gray-600'>
                    <span className='bg-gray-100 px-2 py-1 rounded-full text-xs'>
                      {calculateAge(item.userData.dob)}y
                    </span>
                  </p>

                  {/* Date & Time */}
                  <div className='text-sm'>
                    <p className='font-medium text-gray-800'>{slotDateFormat(item.slotDate)}</p>
                    <p className='text-gray-500'>{item.slotTime}</p>
                  </div>

                  {/* Doctor Info */}
                  <div className='flex items-center gap-3'>
                    <img
                      src={item.docData.image}
                      className='w-10 h-10 rounded-full object-cover bg-blue-100 border-2 border-gray-200 group-hover:border-blue-300 transition-colors duration-200'
                      alt=""
                    />
                    <div>
                      <p className='font-medium text-gray-800 group-hover:text-blue-700 transition-colors duration-200'>
                        {item.docData.name}
                      </p>
                      <p className='text-xs text-gray-500'>{item.docData.speciality}</p>
                    </div>
                  </div>

                  {/* Fees */}
                  <p className='font-semibold text-green-600'>
                    {currency}{item.amount}
                  </p>

                  {/* Status/Action */}
                  <div className='flex justify-center'>
                    {item.cancelled ? (
                      <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700'>
                        <span className='w-2 h-2 bg-red-500 rounded-full mr-1.5'></span>
                        Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700'>
                        <span className='w-2 h-2 bg-green-500 rounded-full mr-1.5'></span>
                        Completed
                      </span>
                    ) : (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className='p-2 rounded-full hover:bg-red-100 transition-colors duration-200 group/btn'
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
              ))
            )}
          </div>

          {/* Footer with total count */}
          {appointments.length > 0 && (
            <div className='bg-gray-50 px-8 py-4 border-t'>
              <p className='text-gray-600 text-sm'>
                Showing {appointments.length} appointment{appointments.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
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

export default AllAppointments