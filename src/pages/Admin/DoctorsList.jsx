import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full'>

      {/* Full Width Container */}
      <div className='w-full h-full p-6'>

        {/* Header Section */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>All Doctors</h1>
          <div className='flex items-center justify-between'>
            <p className='text-gray-600'>Manage your medical team and availability</p>
            <div className='bg-blue-100 px-4 py-2 rounded-full'>
              <span className='text-blue-700 font-medium'>{doctors.length} Total Doctors</span>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8 w-full'>

          {/* Grid Header */}
          <div className='mb-6'>
            <h3 className='text-xl font-semibold text-gray-800'>Medical Team</h3>
            <p className='text-gray-600 text-sm mt-1'>Click on availability toggle to change doctor status</p>
          </div>

          {/* Doctors Grid */}
          {doctors.length === 0 ? (
            <div className='text-center py-16'>
              <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                <svg className='w-10 h-10 text-gray-400' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clipRule='evenodd' />
                </svg>
              </div>
              <p className='text-gray-500 text-lg'>No doctors found</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full'>
              {doctors.map((item, index) => (
                <div
                  className='bg-white border border-blue-100 rounded-2xl overflow-hidden cursor-pointer group hover:shadow-xl hover:-translate-y-2 transition-all duration-300'
                  key={index}
                  style={{
                    animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Doctor Image */}
                  <div className='relative overflow-hidden'>
                    <img
                      className='w-full h-48 object-cover bg-blue-50 group-hover:scale-110 transition-transform duration-500'
                      src={item.image}
                      alt={item.name}
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                    {/* Availability Badge */}
                    <div className='absolute top-3 right-3'>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${item.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        <span className={`w-2 h-2 rounded-full inline-block mr-1 ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        {item.available ? 'Available' : 'Unavailable'}
                      </div>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className='p-5'>
                    <h3 className='text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-200 mb-1'>
                      {item.name}
                    </h3>
                    <p className='text-gray-600 text-sm mb-3'>{item.speciality}</p>

                    {/* Experience & Fees */}
                    <div className='flex items-center justify-between text-xs text-gray-500 mb-4'>
                      <span className='bg-gray-100 px-2 py-1 rounded-full'>{item.experience}</span>
                      <span className='font-medium'>${item.fees}</span>
                    </div>

                    {/* Availability Toggle */}
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium text-gray-700'>Availability</span>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          onChange={() => changeAvailability(item._id)}
                          type="checkbox"
                          checked={item.available}
                          className='sr-only peer'
                        />
                        <div className='w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500'></div>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer with statistics */}
          {doctors.length > 0 && (
            <div className='mt-8 pt-6 border-t border-gray-200'>
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 text-center'>
                <div className='bg-blue-50 p-4 rounded-lg'>
                  <p className='text-2xl font-bold text-blue-600'>{doctors.filter(doc => doc.available).length}</p>
                  <p className='text-blue-700 text-sm'>Available Doctors</p>
                </div>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <p className='text-2xl font-bold text-gray-600'>{doctors.filter(doc => !doc.available).length}</p>
                  <p className='text-gray-700 text-sm'>Unavailable Doctors</p>
                </div>
                <div className='bg-green-50 p-4 rounded-lg'>
                  <p className='text-2xl font-bold text-green-600'>{doctors.length}</p>
                  <p className='text-green-700 text-sm'>Total Doctors</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add custom CSS for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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

export default DoctorsList