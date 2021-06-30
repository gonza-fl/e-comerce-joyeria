import React from 'react';
import './AdminStatistics.css';

function AdminStatistics() {
  return (
    <div className="stats-container">
      <div className="stats-sales-btn">
        <button className="sales-btn" type="submit">Ventas por Mes</button>
        <button className="sales-btn" type="submit">Ventas según Productos</button>
        <button className="sales-btn" type="submit">Ventas según Usuarios</button>
        <button className="sales-btn" type="submit">Ventas por Año</button>
      </div>
      <div className="stats-chart-container">
        Gráfico aquí
      </div>
    </div>
  );
}

export default AdminStatistics;
