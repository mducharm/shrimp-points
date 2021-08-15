import {
  Grid,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { Group, Person } from "../hooks/useGroupManager";
import CancelIcon from '@material-ui/icons/Cancel';

type GroupMembersListProps = {
  group: Group;
};

function GroupMembersList({ group }: GroupMembersListProps) {
  const membersPendingInvite = group?.pendingInvites ?? [];
  useEffect(() => {
    console.log(group);
  });
  return (
    <>
      <h3>{group.groupName}</h3>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Members
          </ListSubheader>
        }
      >
        {group?.members?.map((m: Person) => (
          <ListItem key={m.displayName} button>
            <ListItemText primary={m.displayName} />
          </ListItem>
        ))}

        {membersPendingInvite.map((m: Person) => (
          <ListItem key={m?.id} button>
            <ListItemText primary={m?.displayName + " (pending)"} />
            <CancelIcon onClick={e => {
              if (window.confirm("Are you sure you wish to cancel this invite?")) {
                console.log("cancel invite");
              }
            }}></CancelIcon>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default GroupMembersList;
