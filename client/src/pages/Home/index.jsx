import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


const WeeklyCompletedQuizzesChart = ({ weeklyData }) => {
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
            const data = Object.values(weeklyCounts);

            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Completed Quizzes',
                        data: data,
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
                        },
                    },
                }
            });
        }
    }, [weeklyData]);

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
    const weeklyData = [
        { date: '2024-03-27', completed: 5 },
        { date: '2024-04-03', completed: 8 },
        { date: '2024-04-10', completed: 6 },
        { date: '2024-04-17', completed: 10 },
        { date: '2024-04-24', completed: 7 },
        { date: '2024-05-01', completed: 9 },
        { date: '2024-05-08', completed: 4 }
    ];

    return (
        <div className='w-full'>
            <h2>Weekly Completed Quizzes</h2>
            <WeeklyCompletedQuizzesChart weeklyData={weeklyData} />
        </div>
    );
};

export default Home;
