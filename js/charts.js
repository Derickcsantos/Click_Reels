 const chartConfig = {
    series: [
        {
        name: "Negócios fechados",
        data: [40, 60, 100, 120, 180, 250, 300, 330, 500],
        },
    ],
    chart: {
        type: "bar",
        height: 240,
        toolbar: {
        show: false,
        },
    },
    title: {
        show: "",
    },
    dataLabels: {
        enabled: false,
    },
    colors: ["#f7900a"],
    plotOptions: {
        bar: {
        columnWidth: "40%",
        borderRadius: 2,
        },
    },
    xaxis: {
        axisTicks: {
        show: false,
        },
        axisBorder: {
        show: false,
        },
        labels: {
        style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
        },
        },
        categories: [
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dec",
        ],
    },
    yaxis: {
        labels: {
        style: {
            colors: "rgba(230, 158, 14, 0)",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
        },
        },
    },
    grid: {
        show: true,
        borderColor: "rgba(230, 158, 14, 0)",
        strokeDashArray: 5,
        xaxis: {
        lines: {
            show: true,
        },
        },
        padding: {
        top: 5,
        right: 20,
        },
    },
    fill: {
        opacity: 0.8,
    },
    tooltip: {
        theme: "dark",
    },
    };
    
    const chart = new ApexCharts(document.querySelector("#bar-chart"), chartConfig);
    
    chart.render();