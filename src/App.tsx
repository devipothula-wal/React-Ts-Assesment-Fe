import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import { Button } from 'reactstrap';
import AddTransaction from './components/transactions/addTransaction';
import { Transaction, TransactionType } from './types/transaction';
import TransactionList from './components/transactions/transactionList';
import { getTransactions } from './api/transaction';
import DisplayTranCharts from './components/transactions/totalTranChart';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [transaction, setTransaction] = useState<Transaction>({
    _id: '',
    title: '',
    amount: 0,
    traType: TransactionType.Expense,
    category: '',
    date: ''
  });
  const [transactionList, setTransactionList] = useState<Transaction[]>([])

  const getData = async () => {
    const result = await getTransactions();
    setTransactionList([...result?.data]);
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <div className="App container">
      <Navbar />
      <Button className='addTrnBut mt-4' onClick={() => { setIsModalOpen(!isModalOpen) }}>Add Transaction</Button>
      <AddTransaction
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        transactionList={transactionList}
        transaction={transaction}
        setTransaction={setTransaction}
        getData={getData}
      />
      <TransactionList
        transactionList={transactionList}
        setTransaction={setTransaction}
        setIsModalOpen={setIsModalOpen}
        getData={getData}
        isList={false}
        tableTitle='Transactions'
      />
      {/* {transactionList?.length >= 1 && <DisplayTranCharts transactions={transactionList} />} */}
    </div>
  );
}

export default App;
