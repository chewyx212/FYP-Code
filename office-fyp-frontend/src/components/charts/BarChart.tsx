import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

type Data = {
    name: String,
    data: number[],
}


const BarChart = () => {

    const [chartData, setChartData] = useState<Data []>([]);

    const [chartOptions, setChartOptions] = useState({});

    const barChartData = [
        {
            name: "Orders",
            data: [330, 250, 110, 300, 490, 350, 270, 130, 425],
        },
    ];
    
    const barChartOptions = {
        chart: {
          toolbar: {
            show: false,
          },
        },
        tooltip: {
          style: {
            backgroundColor: "red",
            fontSize: "12px",
            fontFamily: undefined,
          },
          onDatasetHover: {
            style: {
              backgroundColor: "red",
              fontSize: "12px",
              fontFamily: undefined,
            },
          },
          theme: "dark",
        },
        xaxis: {
          categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          show: false,
          labels: {
            show: false,
            style: {
              colors: "#fff",
              fontSize: "12px",
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          show: true,
          color: "#fff",
          labels: {
            show: true,
            style: {
              colors: "#fff",
              fontSize: "14px",
            },
          },
        },
        grid: {
          show: false,
        },
        fill: {
          colors: "#fff",
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            borderRadius: 8,
            columnWidth: "12px",
          },
        },
        responsive: [
          {
            breakpoint: 768,
            options: {
              plotOptions: {
                bar: {
                  borderRadius: 0,
                },
              },
            },
          },
        ],
      };

    useEffect(() => {
        setChartData(barChartData)
        setChartOptions(barChartOptions)
    }, [])

    return (
        <>
            <ReactApexChart
                options={chartOptions}
                series={chartData}
                type="bar"
                width="100%"
                height="100%"
            />
        </>
    )
}

export default BarChart
