import { useMutation } from "@apollo/client";
import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { CREATE_GROUP } from "../graphql/mutations";
import { defaultMutationOptions } from "../helper";
import Main from "../layouts/Main";

export function Group() {
  const [groupName, setGroupName] = useState("");

  const options = {
    variables: {
      groupName,
    },
    ...defaultMutationOptions,
  };

  const [createGroup, { data, loading, error }] = useMutation(CREATE_GROUP, options);

  return (
    <Main>
      <h1>Group</h1>

      {/* create a group */}

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
            onChange={e => setGroupName(e.target.value)}
          />
      <Button onClick={() => createGroup()}>Create Group</Button>

      {/* 
        dropdown for selecting which group to default to
        */}

      <div>
        <h1>Invites</h1>
        {/* 
            
            Be able to send invites    

            */}
      </div>
    </Main>
  );
}
