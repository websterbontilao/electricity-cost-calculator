import React, { useState } from 'react'

type Row = {
    appliance: string,
    usage: number,
    // usageUnit: string,
    energy: number,
    cost: number
}

type TableProps = {
    rows: Row[]
}

function Table({ rows }: TableProps) {

    return (
        <div className='table w-1/2 mt-5 rounded border-solid border-black border-1'>
            <div className='table-header-group'>
                <div className='table-row'> 
                    <div className='table-cell'>Appliance Name</div>
                    <div className='table-cell'>Usage Per Day</div>
                    <div className='table-cell'>Energy</div>
                    <div className='table-cell'>Cost</div>
                </div>
            </div>
            <div className='table-row-group'>
            {
                rows.map((row, index) => (
                    <div className='table-row' key={index}>
                        <div className='table-cell'>{row.appliance}</div>
                        <div className='table-cell'>{row.usage}</div>
                        <div className='table-cell'>{row.energy}</div>
                        <div className='table-cell'>{row.cost}</div>
                    </div>
                ))
            }
            </div>
            <div className='table-footer-group'>

            </div>
        </div>
    );
}

export default Table