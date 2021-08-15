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
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { Group, Invite, Person } from "../hooks/useGroupManager";

type InviteListProps = {
  invites: Invite[];
};

function InviteList(props: InviteListProps) {
  const classes = useStyles();
  const { invites } = props;

  return (
    <>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Invites
          </ListSubheader>
        }
      >
        {invites.map((invite: Invite) => (
          <ListItem key={invite.groupName} button>
            <CancelIcon
              onClick={(e) => {
                if (window.confirm("Are you sure you wish to decline this invite?")) {
                  console.log("decline invite");
                }
              }}
            ></CancelIcon>
            <ListItemText
              primary={`${invite.groupName} - from ${invite.from.displayName}`}
            />
            <CheckCircleIcon></CheckCircleIcon>
          </ListItem>
        ))}
      </List>
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

export default InviteList;
