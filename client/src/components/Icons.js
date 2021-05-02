import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BusinessIcon from "@material-ui/icons/Business";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PersonIcon from "@material-ui/icons/Person";
import HomeWorkIcon from "@material-ui/icons/HomeWork";

export function HomeIcon({ ...props }) {
  return <DashboardIcon {...props} />;
}

export function AccountIcon({ ...props }) {
  return <BusinessIcon { ...props } />;
}

export function ContactIcon({ ...props }) {
  return <PeopleIcon { ...props } />;
}

export function DepartmentIcon({ ...props }) {
  return <HomeWorkIcon { ...props } />;
}

export function ProspectIcon({ ...props }) {
  return <AttachMoneyIcon { ...props } />;
}

export function QuoteIcon({ ...props }) {
  return <AssignmentIcon { ...props } />;
}

export function UserIcon({ ...props }) {
  return <PersonIcon { ...props } />;
}
