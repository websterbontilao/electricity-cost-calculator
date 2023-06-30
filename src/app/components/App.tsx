import React, { useEffect, useState } from 'react'
import Table from './Table';
import Select from './Select'
import NumberField from './NumberField';
import Button from './Button';

// const rows = [
//     { appliance: 'first', usage: 1, energy: 2, cost: 3 },
//     { appliance: 'second', usage: 2, energy: 3, cost: 4 }
// ];

const dateRangeOptions = [
    {label: "Day", value: 1},
    {label: "Month", value: 30},
    {label: "Year", value: 365}
];

// Values with respect to 1 hour
const dailyUsageUnits = [
    {label: "Hours", value:  1},
    {label: "Minutes", value: 60},
    {label: "Seconds", value: 3600}
]

const powerUnits = [
    {label: "Watts", value: 1},
    {label: "Kilowatts", value: 1000}
]

function App() {

    const [pricePerKWH, setPricePerKWH] = useState<number>(0);
    const [dailyUsage, setDailyUsage] = useState<number>(0);
    const [dailyUsageUnit, setDailyUsageUnit] = useState<typeof dailyUsageUnits[0] | undefined>(dailyUsageUnits[0]);
    const [power, setPower] = useState<number>(0);
    const [powerUnit, setPowerUnit] = useState<typeof powerUnits[0] | undefined>(powerUnits[0]);
    const [dateRange, setDateRange] = useState<typeof dateRangeOptions[0] | undefined>(dateRangeOptions[0]);

    const [energy, setEnergy] = useState<number>(0);
    const [cost, setCost] = useState<number>(0);

    const [tableRows, setTableRows] = useState<any[]>([])

    useEffect(() => {

        const itemEnergy = (Math.round(calculateEnergy() * 100) / 100).toFixed(2);
        const itemElectricityCost = (Math.round(calculateCost() * 100) / 100).toFixed(2);

        setEnergy( parseFloat(itemEnergy) );
        setCost( parseFloat(itemElectricityCost) );

    }, [dateRange, dailyUsageUnit, powerUnit, pricePerKWH, dailyUsage, power]);

    function calculateEnergyPerDay() {

        const itemPower = power * (powerUnit?.value || 1);
        const usagePerDay = dailyUsage / (dailyUsageUnit?.value || 1);

        return itemPower * usagePerDay / 1000;
    }

    function calculateEnergy() {

        return calculateEnergyPerDay() * (dateRange?.value || 1);
    }

    function calculateCost() {

        const costPerDay = calculateEnergyPerDay() * pricePerKWH;

        return costPerDay * (dateRange?.value || 1);
    }

    return (
        <div className='mt-5 ml-5'>
            <h1>Electricity Cost Calculator</h1>

            <div>
                <div className='mt-3 flex flex-auto'>
                    <NumberField label="Price per Kilowatt-Hour" value={pricePerKWH} onChange={o => {setPricePerKWH(o)}} />
                    <Select label='Date Range' options={dateRangeOptions} onChange={o => {setDateRange(o)}} value={dateRange} allowClear={false} />
                </div>

                <div className='mt-3 flex flex-auto'>
                    <NumberField label='Power Consumption' value={power} onChange={o => {setPower(o)}} />
                    <Select label='Unit' options={powerUnits} onChange={o => {setPowerUnit(o)}} value={powerUnit} allowClear={false} />
                </div>
                
                <div className='mt-3 flex flex-auto'>
                    <NumberField label='Usage per Day' value={dailyUsage} onChange={o => {setDailyUsage(o)}}/>
                    <Select label='Unit' options={dailyUsageUnits} onChange={o => {setDailyUsageUnit(o)}} value={dailyUsageUnit} allowClear={false} />
                </div>

                <div className='mt-3 flex flex-auto'>
                    <NumberField label='Estimated kWhr Use' value={energy} disabled={true} />
                    <NumberField label='Estimated Cost' value={cost} disabled={true} />
                </div>

                <div>
                    <Button />
                </div>
            </div>

            <Table rows={tableRows}/>
        </div>
    );
}

export default App