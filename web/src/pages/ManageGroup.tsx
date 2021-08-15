import { useMutation, useQuery } from "@apollo/client";
import {
  Backdrop,
  Box,
  Button,
  Collapse,
  Container,
  createStyles,
  Fade,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Theme,
} from "@material-ui/core";
import {
  Copyright,
  ExpandLess,
  ExpandMore,
  StarBorder,
} from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
import ChangeGroupName from "../components/ChangeGroupName";
import GroupMembersList from "../components/GroupMembersList";
import GroupSelect from "../components/GroupSelect";
import InviteList from "../components/InviteList";
import SendInvite from "../components/SendInvite";
import {
  CREATE_GROUP,
  SET_ACTIVE_GROUP as SET_ACTIVE_GROUP,
} from "../graphql/mutations";
import { GET_GROUPS } from "../graphql/queries";
import { defaultMutationOptions } from "../helper";
import {
  Group,
  Person,
  useGroupManager,
} from "../hooks/useGroupManager";
import Main from "../layouts/Main";

export function ManageGroup() {
  const [groupName, setGroupName] = useState("");
  const classes = useStyles();

  const groupManager = useGroupManager();
  const {
    data,
    groups,
    currentPersonId,
    activeGroupId,
    activeGroup,
    setActiveGroup,
    refetch,
    invites
  } = groupManager;

  // if (groupManager.data) {
  //   console.log(groupManager.data);
  //   console.log(groupManager.groups);
  //   console.log(groupManager.activeGroup);
  // }
  if (groupManager.isInGroup) {
    const handleActiveGroupUpdate = (groupId: number) =>
      setActiveGroup({
        variables: {
          activeGroupId: groupId,
          personId: currentPersonId,
        },
      });

    return (
      <Main>
        <Grid container>
          <Grid item xs={12}>
            <GroupMembersList group={activeGroup}></GroupMembersList>
          </Grid>

          <Grid item xs={12}>
            <SendInvite></SendInvite>
          </Grid>

          <Grid item xs={12}>
            <ChangeGroupName></ChangeGroupName>
          </Grid>

          <Grid item xs={12}>
            <GroupSelect
              groups={groups}
              activeGroupId={activeGroupId}
              setActiveGroup={handleActiveGroupUpdate}
            ></GroupSelect>
          </Grid>

          <Grid item xs={12}>
            <InviteList invites={invites}></InviteList>
          </Grid>
        </Grid>
      </Main>
    );
  }

  return (
    <Main>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper + classes.fixedHeight}>
            <h3>You're not in a group yet - create one.</h3>
            <>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="group"
                label="Group Name"
                name="groupname"
                autoComplete="group"
                autoFocus
                onChange={(e) => setGroupName(e.target.value)}
              />
              <Button
                onClick={() => {
                  groupManager.createGroup();
                  groupManager.refetch();
                }}
              >
                Create Group
              </Button>
            </>

            {groupManager.hasInvites && (
              <>
                <p>or accept an invite below:</p>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Main>
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
