import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

type Data = {
    name: String,
    data: number[],
}


const LineChart = () => {

    const [chartData, setChartData] = useState<Data []>([]);

    const [chartOptions, setChartOptions] = useState({});

    const lineChartData = [
        {
          name: "Total Sales",
          data: [50, 40, 300, 220, 500, 250, 400, 230, 500, 400, 230, 500],
        },
    ];
    
    const lineChartOptions = {
    chart: {
        toolbar: {
        show: false,
        },
    },
    tooltip: {
        theme: "dark",
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "smooth",
    },
    xaxis: {
        type: "datetime",
        categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        ],
        labels: {
        style: {
            colors: "#c8cfca",
            fontSize: "12px",
        },
        },
    },
    yaxis: {
        labels: {
        style: {
            colors: "#c8cfca",
            fontSize: "12px",
        },
        },
    },
    legend: {
        show: false,
    },
    grid: {
        strokeDashArray: 5,
    },
    fill: {
        type: "gradient",
        gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [],
        },
        colors: ["#4FD1C5", "#2D3748"],
    },
    colors: ["#4FD1C5", "#2D3748"],
    };

    useEffect(() => {
        setChartData(lineChartData)
        setChartOptions(lineChartOptions)
    }, [])

    return (
        <>
            <ReactApexChart
                options={chartOptions}
                series={chartData}
                type="area"
                width="100%"
                height="100%"
            />
        </>
    )
}

export default LineChart
