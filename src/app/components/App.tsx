import React, { useEffect, useState } from 'react'
import Table from '@components/Table';
import Select, { SelectOptionType, jsonToSelectOptions } from '@components/Select'
import NumberField from '@components/NumberField';
import Button from '@components/Button';
import TextField from './TextField';

import {
  calculateItemPower,
  calculateUsagePerDay,
  calculateEnergyPerDay,
  calculateCostPerDay,
  calculateEnergy,
  calculateCost
} from '@components/utils/EnergyCalculator';

type tableRow = {
  appliance: string,
  powerConsumption: number,
  powerConsumptionUnit: string,
  usage: number,
  usageUnit: string,
  energy: number,
  cost: number
};

const dateRangeOptions: SelectOptionType[] = jsonToSelectOptions( require('@/app/data/dateRange.json') );

// Values with respect to 1 hour
const dailyUsageUnits: SelectOptionType[] = jsonToSelectOptions( require('@/app/data/dailyUsage.json') );

const powerUnits: SelectOptionType[] = jsonToSelectOptions( require('@/app/data/powerUnits.json') );

function App() {

  const [appliance, setAppliance] = useState<string>('');
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

    const itemPower = calculateItemPower(power, powerUnit?.value ?? 1);
    const usagePerDay = calculateUsagePerDay(dailyUsage, dailyUsageUnit?.value ?? 1);
    const energyPerDay = calculateEnergyPerDay(itemPower, usagePerDay);
    const costPerDay = calculateCostPerDay(energyPerDay, pricePerKWH);
    const itemEnergy = calculateEnergy(energyPerDay, dateRange?.value ?? 1);
    const itemElectricityCost = calculateCost(costPerDay, dateRange?.value ?? 1);

    setEnergy(parseFloat(itemEnergy));
    setCost(parseFloat(itemElectricityCost));

  }, [dateRange, dailyUsageUnit, powerUnit, pricePerKWH, dailyUsage, power]);

  function clearFields() {

    setPower(0);
    setDailyUsage(0);
    setAppliance('');
  }

  function addTableRow() {

    const newRow: tableRow = {
      appliance: appliance,
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

        <div className='input-row'>
          <NumberField label="Price per Kilowatt-Hour" value={pricePerKWH} onChange={o => { setPricePerKWH(o) }} disabled={priceDisabled} />
          <Select label='Date Range' options={dateRangeOptions} onChange={o => { setDateRange(o) }} value={dateRange} allowClear={false} disabled={priceDisabled} />
        </div>

        <div className='input-row'>
          <TextField label='Appliance Name' value={appliance} onChange={o => { setAppliance(o.target.value) }} />
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
          <NumberField label='Estimated kWhr Use' value={energy} disabled={true} errorMessage='Invalid Number' />
          <NumberField label='Estimated Cost' value={cost} disabled={true} />
        </div>

        <div className='input-row'>
          <Button type='submit' value="Add Appliance" onClick={addTableRow} btnClass='submit' />
          <Button value="Clear" onClick={clearFields} />
        </div>

      </div>

      <Table rows={tableRows} />
    </div>
  );
}

export default App