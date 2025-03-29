import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { ContainerCharts } from "..";

export default function MaintenanceCharts() {
  const chartRef = useRef(null);

  useEffect(() => {
    // Dados para o gráfico
    const data = {
      
      labels: ['Em Manutenção', 'Em Rota', 'Disponível'],
      datasets: [
        {
          label: 'Status das Motocicletas',
          data: [5, 7, 15], // Quantidade simulada para cada status
          backgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0'], // Cores de cada status
        },
      ],
    };

    // Opções de configuração do gráfico
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    };

    // Inicializando o gráfico
    const ctx = chartRef.current.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });

    // Limpeza ao desmontar o componente
    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <ContainerCharts className="container-charts">
      <div className="chart-title"><h3>Manutenções</h3></div>
      <canvas ref={chartRef} />
    </ContainerCharts>
  );
}
