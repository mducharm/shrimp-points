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
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Group, Person } from "../hooks/useGroupManager";

type ChangeGroupNameProps = {
  group: Group;
};

function ChangeGroupName() {
  const classes = useStyles();
  const [isModalOpen, setModalState] = useState(false);
  const [groupName, setGroupName] = useState("");
  return (
    <>
      <button type="button" onClick={() => setModalState(true)}>
        Change Group Name
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
            <h2 id="transition-modal-title">Change Group Name</h2>
            <p id="transition-modal-description">
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
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </p>
          </div>
        </Fade>
      </Modal>
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

export default ChangeGroupName;
