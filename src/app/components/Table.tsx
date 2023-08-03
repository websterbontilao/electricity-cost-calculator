import React from 'react';
import styles from '@styles/tables.module.css';

type Row = {
  appliance: string,
  powerConsumption: number,
  powerConsumptionUnit: string,
  usage: number,
  usageUnit: string,
  energy: number,
  cost: number
}

type TableProps = {
  rows: Row[]
}

function Table({ rows }: TableProps) {

  return (
    <div className={styles.table}>
      <div className={styles['table-header']}>
        <div className={styles['table-row']}>
          <div className={styles['table-cell']}>Appliance Name</div>
          <div className={styles['table-cell']}>Power Consumption</div>
          <div className={styles['table-cell']}>Usage Per Day</div>
          <div className={styles['table-cell']}>Estimated kWhr Use</div>
          <div className={styles['table-cell']}>Estimated Cost</div>
        </div>
      </div>
      <div className={styles['table-row-group']}>
        {
          rows.length > 0 ? rows.map((row, index) => (
            <div className={styles['table-row']} key={index}>
              <div className={styles['table-cell']}>{row.appliance}</div>
              <div className={styles['table-cell']}>{row.powerConsumption} {row.powerConsumptionUnit}</div>
              <div className={styles['table-cell']}>{row.usage} {row.usageUnit}</div>
              <div className={`${styles['table-cell']} ${styles['number']}`}>{row.energy}</div>
              <div className={`${styles['table-cell']} ${styles['number']}`}>{row.cost}</div>
            </div>
          ))
            : (
              <div className={`${styles['table-row']} ${styles['table-empty']}`}>
                <div className={styles['table-cell']} >No data available</div>
              </div>
            )
        }
      </div>
      <div className={styles['table-footer-group']}>

      </div>
    </div>
  );
}

export default Table