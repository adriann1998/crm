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
  const [originalMonthlyGraphData, setOriginalMonthlyGraphData] = useState([]);
  const [originalYearlyGraphData, setOriginalYearlyGraphData] = useState([]);
  const [monthlyGraphData, setMonthlyGraphData] = useState([]);
  const [yearlyGraphData, setYearlyGraphData] = useState([]);

  const [originalAccMonthlyGraphData, setOriginalAccMonthlyGraphData] = useState([]);
  const [originalAccYearlyGraphData, setOriginalAccYearlyGraphData] = useState([]);
  const [accMonthlyGraphData, setAccMonthlyGraphData] = useState([]);
  const [accYearlyGraphData, setAccYearlyGraphData] = useState([]);

  const [prospectCount, setProspectCount] = useState([]);
  const [isMonthly, setIsMonthly] = useState(true);
  const [filterStartDate, setFilterStartDate] = useState(new Date());
  const [filterEndDate, setFilterEndDate] = useState("Mar-2021");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isAccumulate, setIsAccumulate] = useState(false);
  // const [usersChoices, setUsersChoices] = useState([]);
  // const [userFilter, setUserFilter] = useState(true);

  useEffect(() => {
    let mounted = true;
    setIsLoadingData(true);
    getData("/prospects").then((data) => {
      if (mounted) {
        if (data === null) {
          console.log("Err");
        }
        let revenue, accumulatedRevenue;
        [revenue, accumulatedRevenue] = getRevenue(data, {frequency: 'monthly'});
        setOriginalMonthlyGraphData(revenue);
        setMonthlyGraphData(revenue);
        setOriginalAccMonthlyGraphData(accumulatedRevenue);
        setAccMonthlyGraphData(accumulatedRevenue);
        setFilterStartDate(revenue[0].date);
        setFilterEndDate(revenue[revenue.length - 1].date);

        [revenue, accumulatedRevenue] = getRevenue(data, {frequency: 'yearly'});
        setOriginalYearlyGraphData(revenue);
        setYearlyGraphData(revenue);
        setOriginalAccYearlyGraphData(accumulatedRevenue);
        setAccYearlyGraphData(accumulatedRevenue);

        // const usersChoices = getUserChoices(data);
        // setUsersChoices(usersChoices);
      
        setProspectCount(data.length);
        setIsLoadingData(false);
      }
    });
  }, []);

  useEffect(() => {
    if (!isLoadingData){
      setMonthlyGraphData(originalMonthlyGraphData.filter((rev) =>
        moment(rev.date, 'MMM-yyyy').isBetween(filterStartDate, filterEndDate, undefined, '[]')
      ));
      setAccMonthlyGraphData(originalAccMonthlyGraphData.filter((rev) =>
        moment(rev.date, 'MMM-yyyy').isBetween(filterStartDate, filterEndDate, undefined, '[]')
      ));
      setYearlyGraphData(originalYearlyGraphData.filter((rev) =>
        moment(rev.date, 'yyyy').isBetween(filterStartDate, filterEndDate, undefined, '[]')
      ));
      setAccYearlyGraphData(originalAccYearlyGraphData.filter((rev) =>
        moment(rev.date, 'MMM-yyyy').isBetween(filterStartDate, filterEndDate, undefined, '[]')
      ));
    }
  }, [originalMonthlyGraphData, originalYearlyGraphData, 
    originalAccMonthlyGraphData, originalAccYearlyGraphData,
    filterStartDate, filterEndDate, isLoadingData]);

  const handleStartDateChange = (e) => {
    setFilterStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setFilterEndDate(e.target.value);
  };

  // const handleUserFilterChange = (e) => {
  //   setUserFilter(e.target.value);
  // }

  const yAxisFormater = (n) => (n / 1000000000).toFixed(2).toString() + "B";
  const toolTipFormatter = (n) => accounting.formatMoney(n, "Rp", 2, ",", ".");

  const FreqFilterButtonGroup = () => {
    return (
      <ButtonGroup>
        <Button
          variant={isMonthly ? "contained" : "outlined"}
          text="Monthly"
          onClick={() => setIsMonthly(true)}
        />
        <Button
        variant={!isMonthly ? "contained" : "outlined"}
          text="Yearly"
          onClick={() => setIsMonthly(false)}
        />
      </ButtonGroup>
    )
  }

  const DateFilterButtonGroup = () => {
    return (
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
    )
  }

  const AccumulateFilterButton = () => {
    return (
      <Button
        variant={isAccumulate ? "contained" : "outlined"}
        text="Accumulate"
        onClick={() => setIsAccumulate(!isAccumulate)}
      />
    )
  }

  // const UserChoicesFilter = () => {
  //   return (
  //     <SelectField
  //       required={true}
  //       label="User"
  //       size="small"
  //       defaultValue={true}
  //       onChange={handleUserFilterChange}
  //       items={usersChoices}
  //     />
  //   )
  // }

  return (
    <React.Fragment>
      <PageHeader
        title="Revenue"
        subTitle={`Total prospect: ${prospectCount}`}
        Icon={EqualizerIcon}
      />
      <FreqFilterButtonGroup />
      <DateFilterButtonGroup />
      <AccumulateFilterButton />
      <ResponsiveContainer width="100%" height="100%" aspect={3}>
        <BarChart
          width={150}
          height={40}
          data={isAccumulate 
            ? isMonthly ? accMonthlyGraphData : accYearlyGraphData
            : isMonthly ? monthlyGraphData : yearlyGraphData}
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
