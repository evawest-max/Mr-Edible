// ./components/LineChart.js
import React from "react";
import "./VendorLineChart.css"
import Chart from "chart.js/auto";
import { Bar, Line, Pie } from "react-chartjs-2";
// import { Line } from "react-Chart.js-2";
    const labels = ["0","January", "February", "March", "April", "May", "June"];
    const data = {
        labels: labels,
        datasets: [
        {
        label: "Monthly Revenew 2024",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [10000, 100000, 500000, 200000, 200000, 300000, 850000],
        },
        ],
    };

    const PrpopertyLabels = ["January", "February", "March", "April", "May", "June"];
    const propertyData = {
        labels: PrpopertyLabels,
        datasets: [
        {
        label: "Yearly Registered Vendors",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(0,0,255)",
        data: [0, 10, 5, 2, 20, 30, 45],
        },
        ],
    };

const VendorLineChart = () => {
    return (
    <div id="overview-chart1-container">
        <div>
            <Line data={data} />
        </div>
        <div>
            <Bar data={propertyData}/>
        </div>
    </div>
    );
};
export default VendorLineChart;