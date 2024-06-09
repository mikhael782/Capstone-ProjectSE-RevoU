// bar chart Order Quantity
const getOrderQty = document.getElementById("orderQty");
            
// line chart Average Of Value
const getAOV = document.getElementById("AOV");

// bar chart Quantity Sold by Category 2016
const getQtySoldCtg = document.getElementById("qtySoldCategory");

// bar chart Quantity Sold by Location
const getQtySoldLc = document.getElementById("qtySoldLocation");

// bar chart Sold By Age And Category
const getSoldByAgeNCtg = document.getElementById("SoldByAgeNCtg");

// filtering chart
const btnPenjualan = document.getElementById("btn-penjualan");
const btnAOV = document.getElementById("btn-aov")
const btnSoldByCtg = document.getElementById("btn-qty-sold-ctg");
const btnTotalOrderQty = document.getElementById("btn-total-order-qty-country");
const btnSoldByAgeNCtg = document.getElementById("btn-sold-age-ctg");
// refresh chart
const btnRefresh = document.getElementById("btn-refresh");

const chartPenjualan = document.getElementById("chart-penjualan-bulanan");
const chartAverageOV = document.getElementById("chart-aov");
const chartSoldByCtg = document.getElementById("chart-qty-sold-category");
const chartTotalOrderQty = document.getElementById("chart-total-order-qty-country");
const chartSoldByAgeNCtg = document.getElementById("chart-sold-by-age-and-category");

// filtering chart Order Quantity
btnPenjualan.addEventListener("click", () => {
    chartPenjualan.style.display = "block";
    chartAverageOV.style.display = "none";
    chartSoldByCtg.style.display = "none";
    chartTotalOrderQty.style.display = "none";
    chartSoldByAgeNCtg.style.display = "none";
});

// filtering chart Average Of Value
btnAOV.addEventListener("click", () => {
    chartAverageOV.style.display = "block";
    chartPenjualan.style.display = "none";
    chartSoldByCtg.style.display = "none";
    chartTotalOrderQty.style.display = "none";
    chartSoldByAgeNCtg.style.display = "none";
});

// filtering chart Quantity Sold by Category 2016
btnSoldByCtg.addEventListener("click", () => {
    chartSoldByCtg.style.display = "block";
    chartPenjualan.style.display = "none";
    chartAverageOV.style.display = "none";
    chartTotalOrderQty.style.display = "none";
    chartSoldByAgeNCtg.style.display = "none";
});

// filtering chart Quantity Sold by Location
btnTotalOrderQty.addEventListener("click", () => {
    chartTotalOrderQty.style.display = "block";
    chartPenjualan.style.display = "none";
    chartAverageOV.style.display = "none";
    chartSoldByCtg.style.display = "none";
    chartSoldByAgeNCtg.style.display = "none";
});

// filtering chart Sold By Age And Category
btnSoldByAgeNCtg.addEventListener("click", () => {
    chartSoldByAgeNCtg.style.display = "block";
    chartPenjualan.style.display = "none";
    chartAverageOV.style.display = "none";
    chartSoldByCtg.style.display = "none";
    chartTotalOrderQty.style.display = "none";
});

// refresh chart
btnRefresh.addEventListener("click", () => {
    chartPenjualan.style.display = "block";
    chartAverageOV.style.display = "block";
    chartSoldByCtg.style.display = "block";
    chartTotalOrderQty.style.display = "block";
    chartSoldByAgeNCtg.style.display = "block";
});

// bar chart Order Quantity
const getOrderQuantity = async () => {
    const response = await fetch("../data/dataset.json");
    const dataJson = await response.json();

    // Objek untuk menyimpan total pesanan berdasarkan bulan
    const totalOrdersByMonth = {
        "June": 0,
        "May": 0,
        "April": 0,
        "March": 0,
        "January": 0,
        "February": 0,
        "July": 0
    };

    // Menghitung total pesanan berdasarkan bulan
    dataJson.data.forEach((item) => {
        const month = item.Month;
        if (totalOrdersByMonth.hasOwnProperty(month)) {
            totalOrdersByMonth[month] += parseInt(item.Order_Quantity);
        }
    });

    new Chart(getOrderQty, {
        type: "bar",
        data: {
            labels: Object.keys(totalOrdersByMonth), // Mengambil label dari objek totalOrdersByMonth
            datasets: [
                {
                    label: 'Penjualan Bulanan',
                    data: Object.values(totalOrdersByMonth), // Mengambil data dari objek totalOrdersByMonth
                    backgroundColor: 'rgba(54, 162, 235, 0.9)',
                    borderColor: 'rgba(54, 162, 235, 0.1)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

// line chart Average Of Value
const getAverageOrderValue = async () => {
    const response = await fetch("../data/dataAOV.json");
    const dataJson = await response.json();

    new Chart(getAOV, {
        type: "line",
        data: {
            labels: dataJson.data.map((bikes) => bikes.Month),
            datasets: [
                {
                    label: 'Average Of Value',
                    data: dataJson.data.map((bikes) => bikes.AoV),
                    backgroundColor: 'rgba(54, 162, 235, 1)',
                    borderColor: 'rgba(54, 162, 235, 1.5)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

// bar chart Quantity Sold by Category 2016
const getQtySoldByCategory = async () => {
    const response = await fetch("../data/dataset.json");
    const dataJson = await response.json();

    // Menginisialisasi variabel untuk menyimpan total penjualan tiap kategori
    let totalAccessories = 0;
    let totalClothing = 0;
    let totalBikes = 0;

    // Menghitung total penjualan tiap kategori
    dataJson.data.forEach((item) => {
        if (item.Product_Category === "Accessories") {
            totalAccessories += parseInt(item.Order_Quantity);
        } else if (item.Product_Category === "Clothing") {
            totalClothing += parseInt(item.Order_Quantity);
        } else if (item.Product_Category === "Bikes") {
            totalBikes += parseInt(item.Order_Quantity);
        }
    });

    // Membuat bar chart
    new Chart(getQtySoldCtg, {
        type: "bar",
        data: {
            labels: ["Accessories", "Clothing", "Bikes"],
            datasets: [
                {
                    label: "Quantity Sold by Category 2016",
                    data: [totalAccessories, totalClothing, totalBikes],
                    backgroundColor: [
                        'rgba(255, 165, 0, 0.8)', // Oranye untuk aksesoris
                        'rgba(128, 0, 128, 0.8)', // Ungu untuk pakaian
                        'rgba(0, 128, 0, 0.8)'    // Hijau untuk sepeda
                    ],
                    borderColor: [
                        'rgba(255, 165, 0, 1)',
                        'rgba(128, 0, 128, 1)',
                        'rgba(0, 128, 0, 1)'
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

// bar chart Quantity Sold by Location
const getQtySoldByLocation = async () => {
    const response = await fetch("../data/dataset.json");
    const dataJson = await response.json();

    // Objek untuk menyimpan total pesanan berdasarkan negara
    const totalOrdersByCountry = {
        "United States": 0,
        "Australia": 0,
        "Canada": 0,
        "United Kingdom": 0,
        "Germany": 0,
        "France": 0
    };

    // Menghitung total pesanan berdasarkan negara
    dataJson.data.forEach((item) => {
        const country = item.Country;
        if (totalOrdersByCountry.hasOwnProperty(country)) {
            totalOrdersByCountry[country] += parseInt(item.Order_Quantity);
        }
    });

    // Membuat bar chart
    new Chart(getQtySoldLc, {
        type: "bar",
        data: {
            labels: Object.keys(totalOrdersByCountry), // Mengambil label dari objek totalOrdersByCountry
            datasets: [
                {
                    label: 'Total Order Quantity by Country',
                    data: Object.values(totalOrdersByCountry), // Mengambil data dari objek totalOrdersByCountry
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 159, 64, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

// bar chart Sold By Age And Category
const getSoldByAgeAndCtg = async () => {
    const response = await fetch("../data/dataset.json");
    const dataJson = await response.json();

    // Inisialisasi objek untuk menyimpan penjualan berdasarkan kategori dan kelompok umur
    const salesByCategoryAndAgeGroup = {};

    // Penjualan agregat berdasarkan kategori dan kelompok umur
    dataJson.data.forEach((item) => {
        const category = item.Product_Category;
        const ageGroup = item.Age_Group;
        const orderQuantity = parseInt(item.Order_Quantity);

        if (!salesByCategoryAndAgeGroup[category]) {
            salesByCategoryAndAgeGroup[category] = {};
        }

        if (!salesByCategoryAndAgeGroup[category][ageGroup]) {
            salesByCategoryAndAgeGroup[category][ageGroup] = 0;
        }

        salesByCategoryAndAgeGroup[category][ageGroup] += orderQuantity;
    });

    // Siapkan data untuk diagram batang
    const categories = Object.keys(salesByCategoryAndAgeGroup);
    const ageGroups = [
        "Adults (35-64)",
        "Young Adults (25-34)",
        "Youth (<25)",
        "Seniors (64+)"
    ];

    // Tentukan warna tetap untuk setiap kelompok umur
    const colors = {
        "Adults (35-64)": "rgba(255, 0, 0, 0.8)", // Merah
        "Young Adults (25-34)": "rgba(173, 216, 230, 0.8)", // Hijau telur asin
        "Youth (<25)": "rgba(255, 255, 0, 0.8)", // Kuning
        "Seniors (64+)": "rgba(0, 0, 139, 0.8)" // Biru tua
    };

    const borderColors = {
        "Adults (35-64)": "rgba(255, 0, 0, 1)", // Merah
        "Young Adults (25-34)": "rgba(173, 216, 230, 1)", // Hijau telur asin
        "Youth (<25)": "rgba(255, 255, 0, 1)", // Kuning
        "Seniors (64+)": "rgba(0, 0, 139, 1)" // Biru tua
    };

    const datasets = ageGroups.map(ageGroup => {
        return {
            label: ageGroup,
            data: categories.map(category => salesByCategoryAndAgeGroup[category][ageGroup] || 0),
            backgroundColor: colors[ageGroup],
            borderColor: borderColors[ageGroup],
            borderWidth: 1
        };
    });

    // Membuat bar chart
    new Chart(getSoldByAgeNCtg, {
        type: "bar",
        data: {
            labels: categories,
            datasets: datasets
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

// table Total Penjualan
$(document).ready(function() {
    $('#myTable').DataTable({
        ajax: '../data/dataset.json',
        columns: [
            {'data' : 'Product_Category'},
            {'data' : 'Sub_Category'},
            {'data' : 'Country'},
            {'data' : 'Revenue'}
        ]
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const maxDataToShow = 10; // Ubah sesuai dengan jumlah data maksimum yang ingin Anda tampilkan
    fetch("../data/dataset.json")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#product-table tbody");

            data.data.slice(0, maxDataToShow).forEach(item => { // Hanya menampilkan sejumlah data sesuai dengan maxDataToShow
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>${item.Product_Category}</td>
                <td>${item.Sub_Category}</td>
                <td>${item.Country}</td>
                <td>${item.Revenue}</td>
                `;
                tableBody.appendChild(row);
            });
        })
    .catch(error => console.error("Error fetching data:", error));
});

// memanggil fungsi
getOrderQuantity();
chartPenjualan.style.display = "block";
getAverageOrderValue();
chartAverageOV.style.display = "block";
getQtySoldByCategory();
chartSoldByCtg.style.display = "block";
getQtySoldByLocation();
chartTotalOrderQty.style.display = "block";
getSoldByAgeAndCtg();
chartSoldByAgeNCtg.style.display = "block";