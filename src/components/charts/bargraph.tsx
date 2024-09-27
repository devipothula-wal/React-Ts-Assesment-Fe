import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Transaction } from '../../types/transaction';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData } from 'chart.js';
import './charts.scss'

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
interface ChartProps {
    transactions: Transaction[];
}

const Bargraph: React.FC<ChartProps> = ({ transactions }) => {
    const [data, setData] = useState<ChartData<'bar'>>();

    useEffect(() => {
        if (transactions?.length) {
            const labels = ['Income', 'Expense']

            // Reduce transactions into a Record<string, number> to sum amounts per category
            const amountsByCategory = transactions.reduce((acc, transaction) => {
                acc[transaction.traType] = (acc[transaction.traType] || 0) + transaction.amount;
                return acc;
            }, {} as Record<string, number>);

            // Map the amounts into an array matching the order of `categories`
            const dataValues = labels.map(label => amountsByCategory[label] || 0);
            const backgroundColors = ['#4CAF50', '#F44336'];  // Green for income, red for expense

            //To set different colors to different categories
            const myData: ChartData<'bar'> = {
                labels: labels,
                datasets: [
                    {
                        label: 'Total Amount',
                        data: dataValues,  //Array of amounts for each category
                        backgroundColor: backgroundColors,
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 1,
                    },
                ],
            };
            setData(myData);
        }
    }, [transactions]);

    return (
        <>
            {data &&
                <div className='barGraph'>
                    <Bar data={data} />
                </div>

            }
        </>
    );
};

export default Bargraph;
