import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const WeeklyCompletedQuizzesChart = ({ weeklyData, labelText, data }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartRef && chartRef.current && weeklyData) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');

            // Aggregate data by week
            const weeklyCounts = weeklyData.reduce((acc, { completed, date }) => {
                const weekNumber = getWeekNumber(new Date(date));
                acc[weekNumber] = (acc[weekNumber] || 0) + completed;
                return acc;
            }, {});

            // Extract week numbers and completed counts
            const labels = Object.keys(weeklyCounts);
            const dataValues = Object.values(weeklyCounts);

            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: labelText,
                        data: dataValues,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            fullSize: true,
                            marginBottom: 10,
                            labels: {
                                font: {
                                    size: 20
                                },
                            }
                        },
                    },
                }
            });
        }
    }, [weeklyData, labelText]);

    const getWeekNumber = (date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        const yearStart = new Date(d.getFullYear(), 0, 1);
        const weekNumber = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
        return weekNumber;
    };

    return <canvas ref={chartRef} />;
};

const Home = () => {
    const [selectedMetric, setSelectedMetric] = useState('Completed Tests');

    const weeklyData = [
        { date: '2024-03-27', completed: 5 },
        { date: '2024-04-03', completed: 8 },
        { date: '2024-04-10', completed: 6 },
        { date: '2024-04-17', completed: 10 },
        { date: '2024-04-24', completed: 7 },
        { date: '2024-05-01', completed: 9 },
        { date: '2024-05-08', completed: 4 }
    ];

    const handleTabClick = (metric) => {
        setSelectedMetric(metric);
    };

    let data;
    let labelText;

    switch (selectedMetric) {
        case 'Completed Tests':
            data = weeklyData.map(item => item.completed);
            labelText = 'Completed Tests';
            break;
        case 'Earned Points':
            // Example: Assuming points are earned weekly
            data = [10, 20, 15, 25, 30, 35, 40];
            labelText = 'Earned Points';
            break;
        case 'Active Days':
            // Example: Assuming number of active days are calculated weekly
            data = [3, 4, 5, 6, 7, 5, 4];
            labelText = 'Active Days';
            break;
        // Add more cases for other metrics as needed
        default:
            break;
    }

    return (
        <div className='w-full'>
            <div className="flex justify-center mb-4">
                <button className={`mr-2 px-4 py-2 ${selectedMetric === 'Completed Tests' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => handleTabClick('Completed Tests')}>Completed Tests</button>
                <button className={`mr-2 px-4 py-2 ${selectedMetric === 'Earned Points' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => handleTabClick('Earned Points')}>Earned Points</button>
                <button className={`px-4 py-2 ${selectedMetric === 'Active Days' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => handleTabClick('Active Days')}>Active Days</button>
            </div>
            <WeeklyCompletedQuizzesChart weeklyData={weeklyData} labelText={labelText} data={data} />
        </div>
    );
};

export default Home;
