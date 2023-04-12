import { LineSeries, Chart } from '@devexpress/dx-react-chart-material-ui';
import { FC } from 'react';
import { DashboardWidget } from '../containers/dashboard-widget.container';


interface PieChartWidgetProps {
    data: { argument: number, value: number }[];
}
export const PieChartWidget: FC<PieChartWidgetProps> = ({ data }) => {

    return (
        <DashboardWidget headerText="Inventory" subHeaderText="" linkText="View detailed inventory" href="/inventory">
            <Chart
                height={300}
                data={data}
            >
                {/* <ArgumentAxis />
                <ValueAxis /> */}
                <LineSeries valueField="value" argumentField="argument" />
            </Chart>
        </DashboardWidget>
    )
}