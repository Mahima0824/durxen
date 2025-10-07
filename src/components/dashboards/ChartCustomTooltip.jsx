import React from 'react';

const formatK = (num) => {
  if (num === null || num === undefined) return 'N/A';
  const number = Number(num);
  if (isNaN(number)) return num;
  return number >= 1000 ? `${(number / 1000).toFixed(1).replace(/\.0$/, '')}k` : number;
};

const formatValue = (value, dataKey) => {
  // Handle currency values
  if (['amt', 'pv', 'uv', 'revenue', 'expense', 'value'].includes(dataKey?.toLowerCase())) {
    return `$${formatK(value)}`;
  }
  // Handle percentage values
  if (dataKey?.toLowerCase().includes('percent') || dataKey?.toLowerCase().includes('rate')) {
    return `${value}%`;
  }
  return formatK(value);
};


export default function ChartCustomTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;

  // Special handling for banded range chart
  const isBandedRangeChart = payload.some(item => 
    ['min', 'max', 'average'].includes(item.dataKey)
  );
  
  // Color mapping for banded range chart - matching chart gradients
  const bandedRangeColors = {
    max: '#5d87ff', // Purple for max (matches the chart's gradient)
    average: '#13deb9' // Teal for average (matches the line gradient end color)
  };

  // Handle banded range chart payload
  let displayPayload = [...payload];
  if (isBandedRangeChart) {
    const firstItem = payload[0] || {};
    // Only show max and average, exclude min range
    displayPayload = [
      { 
        ...firstItem, 
        dataKey: 'max', 
        value: firstItem.payload?.max, 
        name: 'Max Range',
        color: bandedRangeColors.max
      },
      { 
        ...firstItem, 
        dataKey: 'average', 
        value: firstItem.payload?.average, 
        name: 'Average',
        color: bandedRangeColors.average
      }
    ];
    
    // Ensure we don't have duplicate entries
    displayPayload = displayPayload.filter((item, index, self) => 
      index === self.findIndex(t => t.dataKey === item.dataKey)
    );
  }

  return (
    <div className="custom-tooltip bg-white rounded-3 border p-3 shadow-sm" style={{ minWidth: '120px' }}>
      {label && (
        <p className="text-muted fs-13 fw-medium mb-2 border-bottom pb-2">{typeof label === 'string' ? label : JSON.stringify(label)}</p>
      )}
      
      <div className="d-flex flex-column gap-2">
        {displayPayload.map((item, index) => {
          const dataKey = item.dataKey || item.name;
          const value = item.value ?? item.payload?.[dataKey];
          const name = item.name;
          
          return (
            <div key={index} className="d-flex justify-content-between">
              <span className="text-muted fs-13">{name}:</span>
              <span className="text-dark fw-medium ms-3">
                {formatValue(value, dataKey)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
