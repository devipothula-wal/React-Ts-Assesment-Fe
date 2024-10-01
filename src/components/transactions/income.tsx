import React, { useEffect, useState } from "react";
import NavBar from "../navbar";
import { Transaction } from "../../types/transaction";
import TransactionList from "./transactionList";
import { getTransactions } from "../../api/transaction";
import LineChart from "../charts/lineChart";
import { Card, CardTitle, CardBody } from "reactstrap";

const Income: React.FC = () => {
    const [incomeList, setIncomeList] = useState<Transaction[]>([])
    const [totalIncome, setTotalIncome] = useState(0);
    const getExpenses = async () => {
        const result = await getTransactions();
        const totalData = result?.data;
        const incomeData = totalData?.filter((item: Transaction) => item?.traType === 'Income');
        if (incomeData?.length) {
            const totalAmount = incomeData.reduce((sum: number, item: Transaction) => sum + item.amount, 0);
            setTotalIncome(totalAmount)
        }
        setIncomeList([...incomeData]);
    }
    useEffect(() => {
        getExpenses();
    }, [])
    return (
        <div className="container">
            <NavBar></NavBar>
            <TransactionList
                transactionList={incomeList}
                isList={true}
                tableTitle="Income"
                totalValue={totalIncome}
            />
            <Card className='mt-4 shadow border-0 chartsContainer'>
                <CardBody>
                    <CardTitle><h5>Income Tracker</h5></CardTitle>
                    <LineChart transactions={incomeList} />
                </CardBody>
            </Card>
        </div>
    )
}

export default Income;