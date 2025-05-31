import React from 'react'

const Quiz = ({ data, loading }) => {
    if (loading) return <div>Loading...</div>;
    console.log(data)
    return (
        <div>
            <h1>{data?.type}</h1>
        </div>
    )
}

export default Quiz