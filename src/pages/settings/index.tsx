import Paper from "@mui/material/Paper";
import React from "react";
import {
  PagingState,
  IntegratedPaging,
  Column,
  DataTypeProvider,
  DataTypeProviderProps,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableHeaderRowProps,
  PagingPanel,
} from "@devexpress/dx-react-grid-material-ui";
import * as services from "../../services";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import { green, red } from "@mui/material/colors";

const Settings: React.FC = () => {
  const columns: ReadonlyArray<Column> = [
    { name: "email", title: "Email" },
    { name: "firstName", title: "First Name" },
    { name: "lastName", title: "Last Name" },
    { name: "phoneNumber", title: "Phone Number" },
    { name: "roleName", title: "Role" },
    { name: "loginAt", title: "Last Login" },
    { name: "status", title: "Status" },
  ];
  const [tableData, setTableData] = React.useState({});

  const { data, error, isError, isLoading, isSuccess } = useQuery(
    "users",
    services.settings.getAllUsers
  );

  React.useEffect(() => {
    if (isSuccess) {
      setTableData(data);
      console.log(isSuccess);
      console.log(data?.data.data);
    }
  }, [isSuccess]);

  const StatusFormatter = (props: DataTypeProviderProps) => (
    <DataTypeProvider
      formatterComponent={({ value }: { value: string }) => {
        const statusMapping: {
          [index: string]: { name: string; color: string };
        } = {
          A: {
            name: "Active",
            color: green[500],
          },
          S: {
            name: "Suspended",
            color: red[500],
          },
        };
        return (
          <Typography
            sx={{
              color: statusMapping[value].color,
            }}
          >
            {statusMapping[value].name}
          </Typography>
        );
      }}
      {...props}
    />
  );

  const DateFormatter = (props: DataTypeProviderProps) => (
    <DataTypeProvider
      formatterComponent={({ value }: { value: string }) => {
        const date = value
          ? dayjs(value).format("DD MMM YYYY h:mm A").toString()
          : "No login attempt";

        return <>{date}</>;
      }}
      {...props}
    />
  );

  const TitleFormatter = (title: string) => {
    return <div>{title}</div>;
  };

  return (
    <>
      <Paper>
        <Grid columns={columns} rows={data?.data.data ?? []}>
          <PagingState
            defaultCurrentPage={0}
            currentPage={data?.data.currentPage}
            pageSize={data?.data.totalItems ?? 0}
          />
          <StatusFormatter for={["status"]} />
          <DateFormatter for={["loginAt"]} />
          <IntegratedPaging />
          <Table />
          <TableHeaderRow />
          <PagingPanel />
        </Grid>
      </Paper>
    </>
  );
};

export default Settings;
