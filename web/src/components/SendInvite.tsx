import { useQuery } from "@apollo/client";
import {
  TextField,
  Button,
  Grid,
  Backdrop,
  Fade,
  Modal,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState, useCallback } from "react";
import { SEND_INVITE } from "../graphql/mutations";
import { SEARCH_PEOPLE } from "../graphql/queries";
import { defaultMutationOptions } from "../helper";
import { Person } from "../hooks/useGroupManager";
import { debounce } from "lodash";

type SendInviteProps = {
  handleSendInvite: (toPersonId: number) => Promise<any>;
};

function SendInvite(props: SendInviteProps) {
  const [isModalOpen, setModalState] = useState(false);
  const [search, setSearchText] = useState("");
  const [person, setPerson] = useState<Person | null>(null);
  const { loading, error, data, refetch } = useQuery(SEARCH_PEOPLE, {
    variables: { search },
    ...defaultMutationOptions,
  });
  const classes = useStyles();

  const { handleSendInvite } = props;

  const debouncedRefetch = useCallback(debounce(refetch, 1000), [search]);

  let people = data?.searchPeople?.nodes ?? [];

  return (
    <>
      <button type="button" onClick={() => setModalState(true)}>
        Send Invite
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isModalOpen}
        onClose={() => setModalState(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpen}>
          <div className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
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
                    return (
                      <TextField {...params} label="User" variant="outlined" />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  onClick={(e) => {
                    if (person == null) {
                      alert("Invalid person selected");
                    } else {
                      handleSendInvite(person.id)
                      .then((invite: any) => {
                        alert("Successfully invited user.")
                        setModalState(false);
                      });
                    }
                  }}
                >
                  Send Invite
                </Button>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default SendInvite;

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
