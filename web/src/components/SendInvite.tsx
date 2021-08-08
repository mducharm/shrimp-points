import { useQuery } from "@apollo/client";
import { TextField, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
import { SEND_INVITE } from "../graphql/mutations";
import { SEARCH_PEOPLE } from "../graphql/queries";
import { defaultMutationOptions } from "../helper";
import { Person } from "../hooks/useGroupManager";

function SendInvite() {
  const [search, setSearchText] = useState("");
  const [person, setPerson] = useState({} as Person);
  const { loading, error, data } = useQuery(SEARCH_PEOPLE, {
    variables: { search },
    ...defaultMutationOptions,
  });
  //   const { loading, error, data } = useQuery(SEND_INVITE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  let people = data?.searchPeople?.nodes;

  return (
    <>
      <Autocomplete
        id="combo-box-demo"
        options={people}
        getOptionLabel={(option: any) => option.displayName}
        style={{ width: 300 }}
        renderInput={(params: any) => {
          console.log(params);
          return <TextField {...params} label="Combo box" variant="outlined" />;
        }}
      />

      <Button
        onClick={(e) => {
          console.log(e);
        }}
      >
        Send Invite
      </Button>
    </>
  );
}

export default SendInvite;
