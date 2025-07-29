import React, { useEffect, useState } from 'react';

const mockAuditData = [
    { id: 1, user: 'jb', action: 'Logged in', timestamp: '2024-06-01 10:00:00' },
    { id: 2, user: 'asdsad', action: 'Made appointment', timestamp: '2024-06-01 10:05:00' },
    { id: 3, user: 'jb', action: 'Payment completed', timestamp: '2024-06-01 10:10:00' },
    { id: 4, user: 'asdsad', action: 'Logged out', timestamp: '2024-06-01 10:15:00' },
    { id: 5, user: 'kirtan1232', action: 'Logged in', timestamp: '2025-07-26 15:15:00' },
    { id: 6, user: 'kirtan1232', action: 'Viewed audit logs', timestamp: '2025-07-26 15:19:14' },
];

const fetchAuditLogs = () => {
    // Replace this with an API call in the future
    return Promise.resolve(mockAuditData);
};

const getActionIcon = (action) => {
    switch (action.toLowerCase()) {
        case 'logged in':
            return (
                <svg className='w-4 h-4 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-2 0V4H5v12h10v-2a1 1 0 112 0v3a1 1 0 01-1 1H4a1 1 0 01-1-1V3z' clipRule='evenodd' />
                    <path fillRule='evenodd' d='M6 10a1 1 0 011-1h6l-2-2a1 1 0 112-1.414L16.414 9a1 1 0 010 1.414L13.414 14A1 1 0 0112 12.586L14 11H7a1 1 0 01-1-1z' clipRule='evenodd' />
                </svg>
            );
        case 'logged out':
            return (
                <svg className='w-4 h-4 text-red-500' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4h10v12a1 1 0 102 0V4a1 1 0 00-1-1H3z' clipRule='evenodd' />
                    <path fillRule='evenodd' d='M12 10a1 1 0 01-1 1H5l2 2a1 1 0 11-1.414 1.414L2.586 11.414a1 1 0 010-1.414L5.586 6.586A1 1 0 017 8l-2 2h6a1 1 0 011 1z' clipRule='evenodd' />
                </svg>
            );
        case 'made appointment':
            return (
                <svg className='w-4 h-4 text-blue-500' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z' clipRule='evenodd' />
                </svg>
            );
        case 'payment completed':
            return (
                <svg className='w-4 h-4 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z' />
                    <path fillRule='evenodd' d='M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z' clipRule='evenodd' />
                </svg>
            );
        default:
            return (
                <svg className='w-4 h-4 text-gray-500' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z' clipRule='evenodd' />
                </svg>
            );
    }
};

const getActionColor = (action) => {
    switch (action.toLowerCase()) {
        case 'logged in':
            return 'bg-green-100 text-green-800';
        case 'logged out':
            return 'bg-red-100 text-red-800';
        case 'made appointment':
            return 'bg-blue-100 text-blue-800';
        case 'payment completed':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString()
    };
};

const AuditLog = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const getLogs = async () => {
            const data = await fetchAuditLogs();
            if (isMounted) setLogs(data);
        };
        getLogs();
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full'>

            {/* Full Width Container */}
            <div className='w-full h-full p-6'>

                {/* Header Section */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-2'>Audit Log</h1>
                    <div className='flex items-center justify-between'>
                        <p className='text-gray-600'>Track all user activities and system events</p>
                        <div className='bg-blue-100 px-4 py-2 rounded-full'>
                            <span className='text-blue-700 font-medium'>{logs.length} Total Events</span>
                        </div>
                    </div>
                </div>

                {/* Audit Log Table */}
                <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden w-full'>

                    {/* Table Header */}
                    <div className='bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-5'>
                        <div className='grid grid-cols-[2fr_3fr_2fr_1fr] gap-6 text-white font-semibold'>
                            <p>User</p>
                            <p>Action</p>
                            <p>Date & Time</p>
                            <p>Status</p>
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className='max-h-[70vh] overflow-y-auto'>
                        {logs.length === 0 ? (
                            <div className='text-center py-16'>
                                <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                                    <svg className='w-10 h-10 text-gray-400' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z' clipRule='evenodd' />
                                    </svg>
                                </div>
                                <p className='text-gray-500 text-lg'>No audit logs found</p>
                            </div>
                        ) : (
                            logs.map((log, index) => {
                                const { date, time } = formatTimestamp(log.timestamp);
                                return (
                                    <div
                                        className='grid grid-cols-[2fr_3fr_2fr_1fr] gap-6 items-center text-gray-600 py-4 px-8 border-b border-gray-100 hover:bg-blue-50 transition-all duration-200 group'
                                        key={log.id}
                                        style={{
                                            animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both`
                                        }}
                                    >
                                        {/* User */}
                                        <div className='flex items-center gap-3'>
                                            <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                                                <span className='text-blue-600 font-medium text-sm'>
                                                    {log.user.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className='font-medium text-gray-800 group-hover:text-blue-700 transition-colors duration-200'>
                                                    {log.user}
                                                </p>
                                                <p className='text-xs text-gray-500'>User ID: {log.user}</p>
                                            </div>
                                        </div>

                                        {/* Action */}
                                        <div className='flex items-center gap-3'>
                                            {getActionIcon(log.action)}
                                            <div>
                                                <p className='font-medium text-gray-800'>{log.action}</p>
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                                                    {log.action}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Date & Time */}
                                        <div>
                                            <p className='font-medium text-gray-800'>{date}</p>
                                            <p className='text-sm text-gray-500'>{time}</p>
                                        </div>

                                        {/* Status */}
                                        <div className='flex justify-center'>
                                            <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700'>
                                                <span className='w-2 h-2 bg-green-500 rounded-full mr-1.5'></span>
                                                Success
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Footer with summary */}
                    {logs.length > 0 && (
                        <div className='bg-gray-50 px-8 py-4 border-t'>
                            <div className='grid grid-cols-1 sm:grid-cols-4 gap-4 text-center'>
                                <div className='bg-white p-3 rounded-lg shadow-sm'>
                                    <p className='text-lg font-bold text-green-600'>
                                        {logs.filter(log => log.action.toLowerCase().includes('login')).length}
                                    </p>
                                    <p className='text-green-700 text-xs'>Login Events</p>
                                </div>
                                <div className='bg-white p-3 rounded-lg shadow-sm'>
                                    <p className='text-lg font-bold text-blue-600'>
                                        {logs.filter(log => log.action.toLowerCase().includes('appointment')).length}
                                    </p>
                                    <p className='text-blue-700 text-xs'>Appointments</p>
                                </div>
                                <div className='bg-white p-3 rounded-lg shadow-sm'>
                                    <p className='text-lg font-bold text-purple-600'>
                                        {logs.filter(log => log.action.toLowerCase().includes('payment')).length}
                                    </p>
                                    <p className='text-purple-700 text-xs'>Payments</p>
                                </div>
                                <div className='bg-white p-3 rounded-lg shadow-sm'>
                                    <p className='text-lg font-bold text-gray-600'>{logs.length}</p>
                                    <p className='text-gray-700 text-xs'>Total Events</p>
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
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default AuditLog;