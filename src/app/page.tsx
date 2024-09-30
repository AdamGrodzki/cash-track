'use client'; 

import { useEffect, useState } from 'react';
import { VscChromeClose } from "react-icons/vsc";
import styles from './page.module.css';

interface Bill {
  name: string;
  amount: number;
  Date: string;
  isPaid: boolean;
}

const Home = ()=> {
  const [bills, setBills] = useState<Bill[]>([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [Date, setDate] = useState('');
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const savedBills = JSON.parse(localStorage.getItem('bills') || '[]');
    if (savedBills) setBills(savedBills);
  }, []);

  useEffect(() => {
    localStorage.setItem('bills', JSON.stringify(bills));
  }, [bills]);

  const addBill = () => {
    const newBill: Bill = { name, amount, Date, isPaid };
    setBills([...bills, newBill]);
    setName('');
    setAmount(0);
    setDate('');
    setIsPaid(false);
  };

  const togglePaid = (index: number) => {
    const updatedBills = [...bills];
    updatedBills[index].isPaid = !updatedBills[index].isPaid;
    setBills(updatedBills);
  };

  const removeBill = (index: number) => {
    const updatedBills = bills.filter((_, i) => i !== index);
    setBills(updatedBills);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Twoje Rachunki</h1>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Nazwa rachunku"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className={styles.input}
        />
        <input
          type="date"
          value={Date}
          onChange={(e) => setDate(e.target.value)}
          className={styles.input}
        />
        <button onClick={addBill} className={styles.addButton}>Dodaj Rachunek</button>
      </div>

      <ul className={styles.billList}>
        {bills.map((bill, index) => (
          <li key={index} className={styles.billItem}>
            <span className={bill.isPaid ? styles.paid : ''}>
              {bill.name} - {bill.amount} zł - Termin: {bill.Date}
            </span>
            <button onClick={() => togglePaid(index)} className={styles.toggleButton}>
              {bill.isPaid ? 'Oznacz jako nieopłacony' : 'Oznacz jako opłacony'}
            </button>
            <button onClick={() => removeBill(index)} className={styles.deleteButton}><VscChromeClose /></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;