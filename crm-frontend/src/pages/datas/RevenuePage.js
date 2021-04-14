import React, { useState, useEffect } from "react";
import PageHeader from '../../components/PageHeader';
import EqualizerIcon from "@material-ui/icons/Equalizer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// utils
import accounting from "accounting";
import { getData } from "../../utils/CRUDUtil";
import { getRevenue } from "../../utils/RevenueUtil";

export default function RevenuePage() {
  
  const [monthlyGraphData, setMonthlyGraphData] = useState([]);
  const [yearlyGraphData, setYearlyGraphData] = useState([]);
  const [prospectCount, setProspectCount] = useState([]);

  useEffect(() => {
    let mounted = true;
    getData("/prospects").then((data) => {
      if (mounted) {
        if (data === null) {
          console.log("Err");
        }
        const monthlyRevenue = getRevenue(data, 'monthly');
        const yearlyRevenue = getRevenue(data, 'yearly');
        setMonthlyGraphData(monthlyRevenue);
        setYearlyGraphData(yearlyRevenue);
        setProspectCount(data.length);
      }
    });
    return () => (mounted = false);
  }, []);

  const yAxisFormater = (n) => (n/1000000).toString() + 'M';
  const toolTipFormatter = (n) => accounting.formatMoney(n, "Rp", 2, ",", ".")

  return (
    <React.Fragment>
      <PageHeader 
        title="Revenue" 
        subTitle={`Total prospect: ${prospectCount}`}
        Icon={EqualizerIcon}
      />
      <h3>Monthly</h3>
      <ResponsiveContainer width="100%" height="100%" aspect={3}>
        <BarChart width={150} height={40} data={monthlyGraphData}>
          <Tooltip formatter={toolTipFormatter} />
          <Bar dataKey="revenue" fill="#8884d8" />
          <XAxis dataKey="date" />
          <YAxis dataKey="revenue" tickFormatter={yAxisFormater}/>
        </BarChart>
      </ResponsiveContainer>
      <h3>Yearly</h3>
      <ResponsiveContainer width="100%" height="100%" aspect={3}>
        <BarChart width={150} height={40} data={yearlyGraphData}>
          <Tooltip formatter={toolTipFormatter} />
          <Bar dataKey="revenue" fill="#8884d8" />
          <XAxis dataKey="date" />
          <YAxis dataKey="revenue" tickFormatter={yAxisFormater}/>
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
