import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Collapse,
  createStyles,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, StarBorder } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
import SendInvite from "../components/SendInvite";
import {
  CREATE_GROUP,
  SET_ACTIVE_GROUP as SET_ACTIVE_GROUP,
} from "../graphql/mutations";
import { GET_GROUPS } from "../graphql/queries";
import { defaultMutationOptions } from "../helper";
import { Person, useGroupManager } from "../hooks/useGroupManager";
import Main from "../layouts/Main";

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
  })
);

export function Group() {
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
  } = groupManager;

  if (groupManager.data) {
    console.log(groupManager.data);
    console.log(groupManager.groups);
    console.log(groupManager.activeGroup);
  }

  return (
    <Main>
      <h1>Group</h1>
      <div>
        <h3>Current Person</h3>
        <p>{data?.currentPerson?.displayName}</p>
      </div>

      {groupManager.canCreateGroup && (
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
      )}

      <SendInvite />

      <>
        <InputLabel id="demo-simple-select-filled-label">
          Active Group
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={activeGroupId}
          onChange={(e) => {
            if (activeGroupId > 0 && currentPersonId > 0) {
              setActiveGroup({
                variables: {
                  activeGroup: e.target.value as number,
                  nodeId: currentPersonId,
                },
              });
              refetch();
            }
          }}
        >
          {groups &&
            groups.map((g: any) => (
              <MenuItem key={g.groupId} value={g.groupId}>
                {g.groupName}
              </MenuItem>
            ))}
        </Select>
      </>

      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Group Members
          </ListSubheader>
        }
        className={classes.root}
      >
        {activeGroup.members.map((m: Person) => (
          <ListItem key={m.displayName} button onClick={() => {}}>
            <ListItemText primary={m.displayName} />
          </ListItem>
        ))}

        {/* {activeGroup?.pendingInvites?.map((m: Person) => (
          <ListItem key={m.displayName} button onClick={() => {}}>
            <ListItemText primary={m.displayName + "- pending"} />
          </ListItem>
        ))} */}
      </List>

      <div>
        <h1>Invites</h1>
        {/* 
            
            Be able to send invites    
            
          */}
      </div>
    </Main>
  );
}
