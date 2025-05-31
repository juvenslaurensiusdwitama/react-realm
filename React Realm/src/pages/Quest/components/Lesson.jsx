import React from 'react'

const Lesson = ({ data, loading }) => {
    if (loading) return <div>Loading...</div>;
    console.log(data)
    return (
        <div>
            <h1>{data?.type}</h1>
        </div>
    )
}

export default Lesson