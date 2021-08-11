import { useQuery } from "@apollo/client";
import { TextField, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState, useCallback } from "react";
import { SEND_INVITE } from "../graphql/mutations";
import { SEARCH_PEOPLE } from "../graphql/queries";
import { defaultMutationOptions } from "../helper";
import { Person } from "../hooks/useGroupManager";
import { debounce } from "lodash";

function SendInvite() {
  const [search, setSearchText] = useState("");
  const [person, setPerson] = useState<Person | null>(null);
  const { loading, error, data, refetch } = useQuery(SEARCH_PEOPLE, {
    variables: { search },
    ...defaultMutationOptions,
  });
  //   const { loading, error, data } = useQuery(SEND_INVITE);

  const debouncedRefetch = useCallback(debounce(refetch, 1000), [search]);

  let people = data?.searchPeople?.nodes ?? [];

  return (
    <>
      <Autocomplete
        id="search-users"
        options={people}
        getOptionLabel={(option: any) => option.displayName}
        style={{ width: 300 }}
        onInputChange={(event: any, value: string) => {
          if (!!value && value !== search) debouncedRefetch();
          setSearchText(value);
        }}
        inputValue={search}
        value={person}
        onChange={(event: any, newValue: Person | null) => {
          if (newValue) setPerson(newValue);
        }}
        getOptionSelected={(option, value) => {
          return value != null && option?.id === value?.id;
        }}
        renderInput={(params: any) => {
          return <TextField {...params} label="User" variant="outlined" />;
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
