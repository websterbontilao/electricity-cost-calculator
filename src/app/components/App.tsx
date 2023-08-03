import React, { useEffect, useState } from 'react'
import Table from './Table';
import Select from './Select'
import NumberField from './NumberField';
import Button from './Button';

type tableRow = {
  appliance: string,
  powerConsumption: number,
  powerConsumptionUnit: string,
  usage: number,
  usageUnit: string,
  energy: number,
  cost: number
};

const dateRangeOptions = [
  { label: "Day", value: 1 },
  { label: "Month", value: 30 },
  { label: "Year", value: 365 }
];

// Values with respect to 1 hour
const dailyUsageUnits = [
  { label: "Hour/s", value: 1 },
  { label: "Minute/s", value: 60 },
  { label: "Second/s", value: 3600 }
]

const powerUnits = [
  { label: "Watts", value: 1 },
  { label: "Kilowatts", value: 1000 }
]

function App() {

  const [pricePerKWH, setPricePerKWH] = useState<number>(0);
  const [priceDisabled, setPriceDisabled] = useState<boolean>(false);
  const [dailyUsage, setDailyUsage] = useState<number>(0);
  const [dailyUsageUnit, setDailyUsageUnit] = useState<typeof dailyUsageUnits[0] | undefined>(dailyUsageUnits[0]);
  const [power, setPower] = useState<number>(0);
  const [powerUnit, setPowerUnit] = useState<typeof powerUnits[0] | undefined>(powerUnits[0]);
  const [dateRange, setDateRange] = useState<typeof dateRangeOptions[0] | undefined>(dateRangeOptions[0]);

  const [energy, setEnergy] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);

  const [tableRows, setTableRows] = useState<tableRow[]>([]);

  useEffect(() => {

    const itemEnergy = (Math.round(calculateEnergy() * 100) / 100).toFixed(2);
    const itemElectricityCost = (Math.round(calculateCost() * 100) / 100).toFixed(2);

    setEnergy(parseFloat(itemEnergy));
    setCost(parseFloat(itemElectricityCost));

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

  function clearFields() {

    setPower(0);
    setDailyUsage(0);
  }

  function addTableRow() {

    const newRow: tableRow = {
      appliance: 'test',
      powerConsumption: power,
      powerConsumptionUnit: powerUnit?.label || '',
      usage: dailyUsage,
      usageUnit: dailyUsageUnit?.label || '',
      energy: energy,
      cost: cost
    };

    setTableRows((currentRows) => [...currentRows, newRow]);
    clearFields();
    setPriceDisabled(true);
  }

  return (
    <div className='mt-5 ml-5'>
      <h1>Electricity Cost Calculator</h1>

      <div>
        <form action="">

          <div className='input-row'>
            <NumberField label="Price per Kilowatt-Hour" value={pricePerKWH} onChange={o => { setPricePerKWH(o) }} disabled={priceDisabled} />
            <Select label='Date Range' options={dateRangeOptions} onChange={o => { setDateRange(o) }} value={dateRange} allowClear={false} />
          </div>

          <div className='input-row'>
            <NumberField label='Power Consumption' value={power} onChange={o => { setPower(o) }} />
            <Select label='Unit' options={powerUnits} onChange={o => { setPowerUnit(o) }} value={powerUnit} allowClear={false} />
          </div>

          <div className='input-row'>
            <NumberField label='Usage per Day' value={dailyUsage} onChange={o => { setDailyUsage(o) }} />
            <Select label='Unit' options={dailyUsageUnits} onChange={o => { setDailyUsageUnit(o) }} value={dailyUsageUnit} allowClear={false} />
          </div>

          <div className='input-row'>
            <NumberField label='Estimated kWhr Use' value={energy} disabled={true} />
            <NumberField label='Estimated Cost' value={cost} disabled={true} />
          </div>

          <div className='input-row'>
            <Button type='submit' value="Add Appliance" onClick={addTableRow} btnClass='submit' />
            <Button value="Clear" onClick={clearFields} />
          </div>
        </form>

      </div>

      <Table rows={tableRows} />
    </div>
  );
}

export default App