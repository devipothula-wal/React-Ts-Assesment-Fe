import React, { useEffect, useState } from "react";
import NavBar from "../navbar";
import { Transaction } from "../../types/transaction";
import TransactionList from "./transactionList";
import { getTransactions } from "../../api/transaction";
import LineChart from "../charts/lineChart";
import { Card, CardTitle, CardBody } from "reactstrap";

const Expense: React.FC = () => {
    const [expensesList, setExpensesList] = useState<Transaction[]>([])
    const [totalExpense, setTotalExpense] = useState(0);
    const getExpenses = async () => {
        const result = await getTransactions();
        const totalData = result?.data;
        const expensesData = totalData?.filter((item: Transaction) => item?.traType === 'Expense');
        if (expensesData?.length) {
            const totalAmount = expensesData.reduce((sum: number, item: Transaction) => sum + item.amount, 0);
            setTotalExpense(totalAmount)
        }
        setExpensesList([...expensesData]);
    }
    useEffect(() => {
        getExpenses();
    }, [])
    return (
        <div className="container">
            <NavBar></NavBar>
            <TransactionList
                transactionList={expensesList}
                isList={true}
                tableTitle="Expenses"
                totalValue={totalExpense}
            />
            <Card className='mt-4 shadow border-0 chartsContainer'>
                <CardBody>
                    <CardTitle><h5>Expenses Tracker</h5></CardTitle>
                    <LineChart transactions={expensesList} />
                </CardBody>
            </Card>

        </div>
    )
}

export default Expense;