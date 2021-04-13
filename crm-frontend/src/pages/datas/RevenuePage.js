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
  
  const [graphData, setGraphData] = useState([]);
  const [prospectCount, setProspectCount] = useState([]);

  useEffect(() => {
    let mounted = true;
    getData("/prospects").then((data) => {
      if (mounted) {
        if (data === null) {
          console.log("Err");
        }
        const revenue = getRevenue(data);
        setGraphData(revenue);
        setProspectCount(data.length);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <React.Fragment>
      <PageHeader 
        title="Revenue Forecast" 
        subTitle={`Total prospect: ${prospectCount}`}
        Icon={EqualizerIcon}
      />
      <ResponsiveContainer width="100%" height="100%" aspect={3}>
        <BarChart width={150} height={40} data={graphData}>
          <Tooltip 
            formatter={(n) => accounting.formatMoney(n, "Rp", 2, ",", ".")} 
          />
          <Bar dataKey="amount" fill="#8884d8" />
          <XAxis dataKey="date" />
          <YAxis dataKey="amount" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
