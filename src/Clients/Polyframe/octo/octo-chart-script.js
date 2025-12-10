const colors = {
    red1: '#CF461A',
    red2: '#EB7A55',
    red3: '#F99A7B',
    red4: '#FFBCA6',
    blue1: '#492CB0',
    blue2: '#523BA4',
    blue3: '#5D49A6',
    blue4: '#715DBA',
    blue5: '#8B78CF',
    blue6: '#A797E0',
    blue7: '#C5BBE8',
    blue8: '#E3DEF6'
};
const baseChartConfig = (step = 20, max = 60, data, opts = {}) => {
    const fontSize = typeof opts.fontSize === 'number' ? opts.fontSize : 14;
    const showValues = opts.showValues !== false; // default true
    const showIndex = !!opts.showIndex; // default false
    const highlightFirstGrid = opts.highlightFirstGrid !== false; // default true

    // custom plugin to draw numeric values at the right end of each bar
    const valueLabelPlugin = {
        id: 'valueLabelPlugin',
        afterDatasetsDraw(chart) {
            if (!showValues) return;
            const ctx = chart.ctx;
            chart.data.datasets.forEach((dataset, datasetIndex) => {
                const meta = chart.getDatasetMeta(datasetIndex);
                meta.data.forEach((bar, i) => {
                    const value = dataset.data[i];
                    if (value == null) return;

                    // position: right edge of bar + small offset
                    const xPos = bar.x + 8; // 8px offset to the right
                    const yPos = bar.y;

                    ctx.save();
                    ctx.font = `${Math.round(fontSize)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial`;
                    ctx.fillStyle = '#ffffff';
                    ctx.textBaseline = 'middle';
                    ctx.textAlign = 'left';
                    ctx.fillText(`${value}%`, xPos, yPos);
                    ctx.restore();
                });
            });
        }
    };

    // plugin to draw index numbers left of y-labels (1,2,3)
    const indexLabelPlugin = {
        id: 'indexLabelPlugin',
        afterDraw(chart) {
            if (!showIndex) return;
            const ctx = chart.ctx;
            const yScale = chart.scales.y;
            if (!yScale) return;

            ctx.save();
            ctx.font = `${Math.round(fontSize * 0.9)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto`;
            ctx.fillStyle = 'rgba(255,255,255,0.9)';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'right';

            // place index number in column to left of y ticks
            const leftX = yScale.left - 12; // tweak as needed
            chart.data.labels.forEach((label, i) => {
                const y = yScale.getPixelForTick(i);
                ctx.fillText(String(i + 1), leftX, y);
            });

            ctx.restore();
        }
    };

    return {
        type: 'bar',
        data,
        options: {
            indexAxis: 'y',
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: (ctx) => `${ctx.parsed.x}%`
                    }
                },
                // register title per-chart if provided in opts.titleText (handled by createChart)
            },
            layout: {
                // give room for y labels and optional index numbers
                padding: {
                    left: showIndex ? 160 : 120,
                    right: 20,
                    top: 24,
                    bottom: 24
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: max,
                    ticks: {
                        stepSize: step,
                        callback: (value) => value + '%',
                        color: '#ffffff',
                        font: {
                            size: fontSize,
                            weight: '500'
                        }
                    },
                    grid: {
                        color: (context) => {
                            const tickValue = context && context.tick && typeof context.tick.value !== 'undefined' ?
                                context.tick.value :
                                (typeof context.index !== 'undefined' ? context.index * step : null);

                            if (highlightFirstGrid && tickValue === 0) return 'rgba(255,255,255,0.9)';
                            return 'rgba(255,255,255,0.12)';
                        },
                        lineWidth: (context) => {
                            const tickValue = context && context.tick && typeof context.tick.value !== 'undefined' ?
                                context.tick.value :
                                (typeof context.index !== 'undefined' ? context.index * step : null);
                            return (highlightFirstGrid && tickValue === 0) ? 1.5 : 1;
                        },
                        drawBorder: false
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#ffffff',
                        font: {
                            size: fontSize,
                            weight: '400'
                        },
                        padding: 12,
                        callback: function (value, index, ticks) {
                            // Ensure Chart.js shows the actual label instead of 0,1,2...
                            const label = this.getLabelForValue(value);
                            return label || '';
                        }
                    }
                }

            },
            elements: {
                bar: {
                    // borderRadius accepts object for per-corner rounding
                    borderRadius: {
                        topLeft: 0,
                        bottomLeft: 0,
                        topRight: 10,
                        bottomRight: 10
                    },
                    borderSkipped: false
                }
            }
        },
        plugins: [valueLabelPlugin, indexLabelPlugin]
    };
};
const createChart = (canvasId, data, step = 20, max = 60, opts = {}) => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.warn('Canvas not found:', canvasId);
        return null;
    }
    const ctx = canvas.getContext('2d');

    // allow passing a title per-chart via opts.title
    const config = baseChartConfig(step, max, data, opts);

    if (opts.title) {
        config.options.plugins.title = {
            display: true,
            text: opts.title,
            color: '#ffffff',
            font: {
                size: opts.fontSize ? Math.round(opts.fontSize * 1.15) : 16,
                weight: '500'
            },
            padding: {
                bottom: 16
            }
        };
    }

    // instantiate chart
    return new Chart(ctx, config);
};

// ====== usage examples ======
$(document).ready(function () {

    // old chart part-1-1 (with value labels + index numbers hidden)
    createChart('part-1-1', {
        labels: [
            "A critical driver of business outcomes",
            "A compliance or accessibility requirement",
            "A helpful but non-essential function",
            "A nice-to-have",
            "Other"
        ],
        datasets: [{
            label: "Value",
            data: [54, 18, 17, 11, 1],
            backgroundColor: [colors.red1, colors.blue1, colors.blue4, colors.blue6, colors.blue8],
            barPercentage: 0.75,
            categoryPercentage: 0.85
        }]
    }, 20, 60, {
        fontSize: 16,
        showValues: true, // value shown on right
        showIndex: false, // no index numbers at left
        highlightFirstGrid: true,
        title: 'Our organization views UX as...'
    });

    // second chart part-1-2 (match screenshot: show values, no index numbers, slightly bigger fonts)
    createChart('part-1-2', {
        labels: [
            "Customer satisfaction NPS",
            "Retention and loyalty",
            "Speeding up development cycles",
            "Conversion rate optimization",
            "Reducing support costs",
            "Competitive differentiation"
        ],
        datasets: [{
            label: "Value",
            data: [59, 47, 45, 42, 42, 40],
            backgroundColor: [
                colors.red1,
                colors.blue1,
                colors.blue3,
                colors.blue5,
                colors.blue7,
                colors.blue8
            ],
            barPercentage: 0.75,
            categoryPercentage: 0.85
        }]
    }, 20, 60, {
        fontSize: 15,
        showValues: true,
        showIndex: false,
        highlightFirstGrid: true,
        title: 'Where does UX deliver measurable business value for your organization?'
    });

});