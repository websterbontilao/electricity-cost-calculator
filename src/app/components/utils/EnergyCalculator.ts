
export const calculateItemPower = (power: number, unitValue: number) => {

  return power * unitValue;
}

export const calculateUsagePerDay = (dailyUsage: number, unitValue: number ) => {

  return dailyUsage / unitValue;
}

export const calculateEnergyPerDay = (itemPower: number, usagePerDay: number) => {

  return itemPower * usagePerDay / 1000;
}

export const calculateCostPerDay = (energyPerDay: number, pricePerKWH: number) => {

  return energyPerDay * pricePerKWH;
}

export const calculateEnergy = (energyPerDay: number, dateRange: number) => {

  return roundOff(energyPerDay * dateRange);
}

export const calculateCost = (costPerDay: number, unitValue: number) => {

  return roundOff(costPerDay * unitValue);
}

const roundOff = (value: number, floatingValue: number = 2): string => {
  
  return (Math.round(value * 10 ** floatingValue) / 10 ** floatingValue).toFixed(floatingValue);
};