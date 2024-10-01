import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Transaction } from '../../types/transaction';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartData } from 'chart.js';
import './charts.scss';

// Register the required components for Line chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineChartProps {
    transactions: Transaction[];
}

const LineChart: React.FC<LineChartProps> = ({ transactions }) => {
    const [data, setData] = useState<ChartData<'line'>>();

    useEffect(() => {
        if (transactions?.length) {
            // Sort transactions by date to ensure correct order on the chart
            const sortedTransactions = transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

            // Extract dates and corresponding amounts from transactions
            const dates = sortedTransactions.map(transaction => transaction.date);
            const amounts = sortedTransactions.map(transaction => transaction.amount);

            const myData: ChartData<'line'> = {
                labels: dates,  // X-axis labels (dates)
                datasets: [
                    {
                        label: 'Total Amount',
                        data: amounts,  // Y-axis values (amounts)
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                        tension: 0.3,  // Smooth curve
                        pointBorderColor: 'rgba(75, 192, 192, 1)',
                        pointBackgroundColor: 'rgba(255, 255, 255, 1)',
                        pointBorderWidth: 2,
                        pointHoverRadius: 5,
                    },
                ],
            };
            setData(myData);
        }
    }, [transactions]);

    return (
        <>
            {data &&
                <div className='lineChart'>
                    <Line data={data} />
                </div>
            }</>

    );
};

export default LineChart;
