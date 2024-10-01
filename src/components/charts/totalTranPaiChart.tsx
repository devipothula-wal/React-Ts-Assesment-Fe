import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Transaction } from '../../types/transaction';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData, ArcElement, PointElement } from 'chart.js';
import './charts.scss'

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement,);
interface ChartProps {
    transactions: Transaction[];
}

const PieChart: React.FC<ChartProps> = ({ transactions }) => {
    const [data, setData] = useState<ChartData<'pie'>>();

    // Function to generate random RGBA colors
    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgba(${r}, ${g}, ${b}, 0.6)`; // You can adjust the alpha (0.6) if needed
    };
    useEffect(() => {
        if (transactions?.length) {
            const categories = Array.from(new Set(transactions.map(t => t.category)));

            // Reduce transactions into a Record<string, number> to sum amounts per category
            const amountsByCategory = transactions.reduce((acc, transaction) => {
                acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
                return acc;
            }, {} as Record<string, number>);

            // Map the amounts into an array matching the order of `categories`
            const dataValues = categories.map(category => amountsByCategory[category] || 0);

            //To set different colors to different categories

            const backgroundColors = categories.map(() => getRandomColor());

            const myData: ChartData<'pie'> = {
                labels: categories,
                datasets: [
                    {
                        // label: 'Total Amount',
                        data: dataValues,  //Array of amounts for each category
                        backgroundColor: backgroundColors,
                        borderColor: 'rgba(0,0,0,1)',
                        // borderWidth: 1,
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
                    <Pie data={data} />
                </div>}
        </>)

};

export default PieChart;
