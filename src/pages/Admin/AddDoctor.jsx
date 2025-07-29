import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {

            if (!docImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData();

            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            // console log formdata            
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full'>

            {/* Full Width Container */}
            <div className='w-full h-full p-6'>

                {/* Header Section */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-2'>Add New Doctor</h1>
                    <p className='text-gray-600'>Add a new doctor to your medical practice</p>
                </div>

                <form onSubmit={onSubmitHandler} className='w-full'>
                    <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden w-full'>

                        {/* Form Header */}
                        <div className='bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6'>
                            <h3 className='text-white font-semibold text-xl'>Doctor Information</h3>
                        </div>

                        {/* Form Content */}
                        <div className='p-8 max-h-[75vh] overflow-y-auto'>

                            {/* Image Upload Section */}
                            <div className='flex items-center gap-6 mb-8 p-6 bg-blue-50 rounded-xl border-2 border-dashed border-blue-200 hover:border-blue-300 transition-colors duration-200'>
                                <label htmlFor="doc-img" className='cursor-pointer group'>
                                    <div className='relative'>
                                        <img
                                            className='w-20 h-20 bg-gray-100 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-200'
                                            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                                            alt=""
                                        />
                                        <div className='absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-2 shadow-md group-hover:bg-blue-600 transition-colors duration-200'>
                                            <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                                                <path d='M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z' />
                                                <path d='M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z' />
                                            </svg>
                                        </div>
                                    </div>
                                </label>
                                <input onChange={(e) => setDocImg(e.target.files[0])} type="file" name="" id="doc-img" hidden />
                                <div>
                                    <p className='text-gray-700 font-medium text-lg'>Upload Doctor Picture</p>
                                    <p className='text-gray-500 text-sm'>Choose a clear, professional photo</p>
                                </div>
                            </div>

                            {/* Form Fields Grid */}
                            <div className='grid lg:grid-cols-2 gap-8 text-gray-600'>

                                {/* Left Column */}
                                <div className='space-y-6'>

                                    <div className='space-y-2'>
                                        <label className='block text-sm font-medium text-gray-700'>Doctor Name</label>
                                        <input
                                            onChange={e => setName(e.target.value)}
                                            value={name}
                                            className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200'
                                            type="text"
                                            placeholder='Enter full name'
                                            required
                                        />
                                    </div>

                                    <div className='space-y-2'>
                                        <label className='block text-sm font-medium text-gray-700'>Email Address</label>
                                        <input
                                            onChange={e => setEmail(e.target.value)}
                                            value={email}
                                            className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200'
                                            type="email"
                                            placeholder='doctor@example.com'
                                            required
                                        />
                                    </div>

                                    <div className='space-y-2'>
                                        <label className='block text-sm font-medium text-gray-700'>Password</label>
                                        <input
                                            onChange={e => setPassword(e.target.value)}
                                            value={password}
                                            className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200'
                                            type="password"
                                            placeholder='Create secure password'
                                            required
                                        />
                                    </div>

                                    <div className='space-y-2'>
                                        <label className='block text-sm font-medium text-gray-700'>Experience</label>
                                        <select
                                            onChange={e => setExperience(e.target.value)}
                                            value={experience}
                                            className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white'
                                        >
                                            <option value="1 Year">1 Year</option>
                                            <option value="2 Year">2 Years</option>
                                            <option value="3 Year">3 Years</option>
                                            <option value="4 Year">4 Years</option>
                                            <option value="5 Year">5 Years</option>
                                            <option value="6 Year">6 Years</option>
                                            <option value="8 Year">8 Years</option>
                                            <option value="9 Year">9 Years</option>
                                            <option value="10 Year">10 Years</option>
                                        </select>
                                    </div>

                                    <div className='space-y-2'>
                                        <label className='block text-sm font-medium text-gray-700'>Consultation Fees</label>
                                        <input
                                            onChange={e => setFees(e.target.value)}
                                            value={fees}
                                            className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200'
                                            type="number"
                                            placeholder='Enter fees amount'
                                            required
                                        />
                                    </div>

                                </div>

                                {/* Right Column */}
                                <div className='space-y-6'>

                                    <div className='space-y-2'>
                                        <label className='block text-sm font-medium text-gray-700'>Speciality</label>
                                        <select
                                            onChange={e => setSpeciality(e.target.value)}
                                            value={speciality}
                                            className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white'
                                        >
                                            <option value="General physician">General physician</option>
                                            <option value="Gynecologist">Gynecologist</option>
                                            <option value="Dermatologist">Dermatologist</option>
                                            <option value="Pediatricians">Pediatricians</option>
                                            <option value="Neurologist">Neurologist</option>
                                            <option value="Gastroenterologist">Gastroenterologist</option>
                                        </select>
                                    </div>

                                    <div className='space-y-2'>
                                        <label className='block text-sm font-medium text-gray-700'>Degree</label>
                                        <input
                                            onChange={e => setDegree(e.target.value)}
                                            value={degree}
                                            className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200'
                                            type="text"
                                            placeholder='e.g., MBBS, MD'
                                            required
                                        />
                                    </div>

                                    <div className='space-y-2'>
                                        <label className='block text-sm font-medium text-gray-700'>Address</label>
                                        <div className='space-y-3'>
                                            <input
                                                onChange={e => setAddress1(e.target.value)}
                                                value={address1}
                                                className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200'
                                                type="text"
                                                placeholder='Address Line 1'
                                                required
                                            />
                                            <input
                                                onChange={e => setAddress2(e.target.value)}
                                                value={address2}
                                                className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200'
                                                type="text"
                                                placeholder='Address Line 2'
                                                required
                                            />
                                        </div>
                                    </div>

                                </div>

                            </div>

                            {/* About Section */}
                            <div className='mt-8 space-y-2'>
                                <label className='block text-sm font-medium text-gray-700'>About Doctor</label>
                                <textarea
                                    onChange={e => setAbout(e.target.value)}
                                    value={about}
                                    className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none'
                                    rows={4}
                                    placeholder='Write about the doctor - qualifications, experience, specializations...'
                                />
                            </div>

                            {/* Submit Button */}
                            <div className='mt-8 pt-6 border-t border-gray-200'>
                                <button
                                    type='submit'
                                    className='bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105'
                                >
                                    Add Doctor
                                </button>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddDoctor