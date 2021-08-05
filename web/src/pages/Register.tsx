import React, { ChangeEvent, MouseEventHandler, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { AUTHENTICATE, REGISTER } from "../graphql/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useStore } from "../store/store";
import { ActionKind } from "../store/actions";
import { Redirect, useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();
  const { dispatch } = useStore();
  const history = useHistory();

  const [formValues, setFormValues] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(formValues);
  });

  const [register, { data, loading, error }] = useMutation(REGISTER, {
    variables: formValues,
    onCompleted(d) {
      console.log(d);
      console.log("register success");
    },
    onError({ graphQLErrors, networkError }) {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          console.log(err);
        }
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    },
  });

  const [login, { data: authData, loading: authLoading, error: authError }] =
    useMutation(AUTHENTICATE, {
      variables: {
        email: formValues.email,
        password: formValues.password,
      },
      onCompleted(d) {
        console.log("login success");
        console.log(d);
      },
      onError({ graphQLErrors, networkError }) {
        if (graphQLErrors) {
          for (let err of graphQLErrors) {
            console.log(err);
          }
        }
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
      },
    });

  if (data) {
    login();
    if (authData) {
      dispatch({ type: ActionKind.LOGIN, authToken: authData });
      history.push("/");
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormValues((previousValues) => ({
      ...previousValues,
      [e.target.name]: e.target.value,
    }));

  return (
    <Container component="main" maxWidth="xs">
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error: {error.message}</h1>}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => e.preventDefault()}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                name="displayName"
                variant="outlined"
                required
                fullWidth
                id="displayName"
                label="Display Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => register()}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
