import {
  Grid,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Backdrop,
  Fade,
  Modal,
  TextField,
  createStyles,
  makeStyles,
  Theme,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { Group, Person } from "../hooks/useGroupManager";

type GroupSelectProps = {
  activeGroupId: number;
  groups: Group[];
  setActiveGroup: (groupId: number) => void;
};

function GroupSelect(props: GroupSelectProps) {
  const classes = useStyles();
  const { activeGroupId, groups, setActiveGroup } = props;

  if (activeGroupId === 0 && groups.length > 0) {
    setActiveGroup(groups[0].groupId);
  }

  const groupItems =
    groups.length > 0
      ? groups.map((g: any) => (
          <MenuItem key={g.groupId} value={g.groupId}>
            {g.groupName}
          </MenuItem>
        ))
      : null;

  return (
    <>
      <InputLabel id="demo-simple-select-filled-label">Active Group</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={activeGroupId}
        onChange={(e, child) => setActiveGroup(e.currentTarget.value as number)}
      >
        {groupItems}
      </Select>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    // paper: {
    //   padding: theme.spacing(2),
    //   display: "flex",
    //   overflow: "auto",
    //   flexDirection: "column",
    // },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    fixedHeight: {
      height: 240,
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

export default GroupSelect;
