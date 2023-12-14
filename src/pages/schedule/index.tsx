import React from "react";
import Paper from "@mui/material/Paper";
import {
  Scheduler,
  MonthView,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  ViewSwitcher,
  DayView,
  AppointmentTooltip,
  AllDayPanel,
} from "@devexpress/dx-react-scheduler-material-ui";
import AddIcon from "@mui/icons-material/Add";
import { connectProps } from "@devexpress/dx-react-core";
import {
  ViewState,
  SchedulerDateTime,
  AppointmentModel,
} from "@devexpress/dx-react-scheduler";
import dayjs from "dayjs";
import { appointments } from "../../mock/month-appointment";
import IconButton from "@mui/material/IconButton";

const Schedule: React.FC = () => {
  const [currentView, setCurrentView] = React.useState<string>("Month");
  const [currentDate, setCurrentDate] = React.useState<SchedulerDateTime>(
    dayjs().toDate()
  );

  const handleViewNameChange = (viewName: string) => {
    console.log(viewName);
    setCurrentView(viewName);
  };

  const onNavigateHandler = (newDate: Date) => {
    setCurrentDate(newDate);
  };
  const openSchedule = () => {
    console.log("OPEN MODAL!");
    // onClick();
  };

  const ToolbarAction = ({
    handleAddSchedule,
    ...rest
  }: {
    handleAddSchedule: () => void;
  }) => {
    return (
      <Toolbar.FlexibleSpace {...rest}>
        <IconButton aria-label="add" onClick={handleAddSchedule}>
          <AddIcon />
        </IconButton>
      </Toolbar.FlexibleSpace>
    );
  };

  const flexibleSpace = connectProps(ToolbarAction, () => {
    return {
      handleAddSchedule: openSchedule,
    };
  });

  return (
    <>
      <Paper>
        <Scheduler data={appointments}>
          <ViewState
            defaultCurrentDate={dayjs().toDate()}
            currentDate={currentDate}
            onCurrentDateChange={onNavigateHandler}
            currentViewName={currentView}
            onCurrentViewNameChange={handleViewNameChange}
          />

          <DayView />
          <WeekView />
          <MonthView />
          <Toolbar flexibleSpaceComponent={flexibleSpace} />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <Appointments />
          <AppointmentTooltip />
          <AllDayPanel />
        </Scheduler>
      </Paper>
    </>
  );
};

export default Schedule;
