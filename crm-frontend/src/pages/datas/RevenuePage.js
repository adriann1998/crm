import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ButtonGroup from "../../components/ButtonGroup";
import Button from "../../components/Button";
import DateField from "../../components/inputFields/DateField";
// utils
import accounting from "accounting";
import { getData } from "../../utils/CRUDUtil";
import { getRevenue } from "../../utils/RevenueUtil";
import moment from "moment";

export default function RevenuePage() {
  const [monthlyGraphData, setMonthlyGraphData] = useState([]);
  const [yearlyGraphData, setYearlyGraphData] = useState([]);
  const [prospectCount, setProspectCount] = useState([]);
  const [isMonthly, setIsMonthly] = useState(true);
  const [filterStartDate, setFilterStartDate] = useState(new Date());
  const [filterEndDate, setFilterEndDate] = useState("Mar-2021");

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
        setFilterStartDate(monthlyRevenue[0].date);
        setFilterEndDate(monthlyRevenue[monthlyRevenue.length - 1].date);
        setProspectCount(data.length);
      }
    });
  }, []);

  useEffect(() => {
    setMonthlyGraphData(monthlyGraphData.filter((rev) =>
      moment(rev.date).isBetween(filterStartDate, filterEndDate)
    ));
    setYearlyGraphData(yearlyGraphData.filter((rev) =>
      moment(rev.date).isBetween(filterStartDate, filterEndDate)
    ));
  }, [filterStartDate, filterEndDate]);

  const handleStartDateChange = (e) => {
    setFilterStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setFilterEndDate(e.target.value);
  };

  const yAxisFormater = (n) => (n / 1000000).toString() + "M";
  const toolTipFormatter = (n) => accounting.formatMoney(n, "Rp", 2, ",", ".");

  return (
    <React.Fragment>
      <PageHeader
        title="Revenue"
        subTitle={`Total prospect: ${prospectCount}`}
        Icon={EqualizerIcon}
      />
      <ButtonGroup>
        <Button
          text="Monthly"
          onClick={() => {
            setIsMonthly(true);
          }}
        />
        <Button
          text="Yearly"
          onClick={() => {
            setIsMonthly(false);
          }}
        />
      </ButtonGroup>
      <ButtonGroup>
        <DateField
          views={isMonthly ? ["year", "month"] : ["year"]}
          format={isMonthly ? "MMM yyyy" : "yyyy"}
          value={filterStartDate}
          onChange={handleStartDateChange}
        />
        <DateField
          views={isMonthly ? ["year", "month"] : ["year"]}
          format={isMonthly ? "MMM yyyy" : "yyyy"}
          value={filterEndDate}
          onChange={handleEndDateChange}
        />
      </ButtonGroup>
      <ResponsiveContainer width="100%" height="100%" aspect={3}>
        <BarChart
          width={150}
          height={40}
          data={isMonthly ? monthlyGraphData : yearlyGraphData}
        >
          <Tooltip formatter={toolTipFormatter} />
          <Bar dataKey="revenue" fill="#8884d8" />
          <XAxis dataKey="date" />
          <YAxis dataKey="revenue" tickFormatter={yAxisFormater} />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
