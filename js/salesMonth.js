const datasalesmonth = {
    labels: ['1 Jan 2023', '2 Jan 2023', '3 Jan 2023', '4 Jan 2023','5 Jan 2023', '6 Jan 2023', '7 Jan 2023', '8 Jan 2023', '9 Jan 2023', '10 Jan 2023'],
    datasets: [{
        label: 'Lower Manhattan',
        data: [788, 649, 756, 630, 800, 790, 788, 972, 1008, 930],
        backgroundColor: '#ff6b6b',
        borderColor: '#ff6b6b',
        borderWidth: 2,
        tension: 0.1
    },
    {
        label: 'Hells Kitchen',
        data: [851, 828, 906, 781, 714, 767, 1024, 872, 894, 808],
        backgroundColor: '#0461b1',
        borderColor: '#0461b1',
        borderWidth: 2,
        tension: 0.1
    },
    {
        label: 'Astoria',
        data: [868, 925, 902, 808, 903, 716, 807, 793, 947, 0],
        backgroundColor: '#ffbb00',
        borderColor: '#ffbb00',
        borderWidth: 2,
        tension: 0.1
    }]
};

const configsalesmonth = {
    type: 'bar',
    data: datasalesmonth,
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Sales by Month',
                padding: {
                    top: 10,
                    bottom: 10
                },
                font: {
                    size: 40
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

const salesmonth = new Chart(
    document.getElementById('salesmonth'),
    configsalesmonth
);
