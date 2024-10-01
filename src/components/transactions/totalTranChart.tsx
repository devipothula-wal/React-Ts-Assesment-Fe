import React from "react";
import { Transaction } from "../../types/transaction";
import { Card, CardTitle, CardBody } from 'reactstrap'
import PieChart from "../charts/totalTranPaiChart";
import Bargraph from "../charts/bargraph";
import '../charts/charts.scss'


interface ChartProps {
    transactions: Transaction[];
}

const DisplayTranCharts: React.FC<ChartProps> = ({ transactions }) => {
    return (
        <Card className='mt-4 shadow border-0 chartsContainer'>
            <CardTitle><h5>Expenses And Income</h5></CardTitle>
            <CardBody className="d-flex justify-content-between">
                <PieChart transactions={transactions} />
                <Bargraph transactions={transactions}/>
            </CardBody>
        </Card>
    )
}

export default DisplayTranCharts;