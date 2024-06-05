"use client";

import * as React from "react";
import { useState } from "react";
import { Button, TextField, Grid } from "@mui/material";
import Image from "next/image";
import michael from "../../public/images/Michael.PNG";
import supabase from "../../supabase";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const login = async () => {
    if (!email) {
      alert("Please enter a valid email");
      return;
    }
    try {
      setLoading(true);
      let { data, error } = await supabase.auth.signInWithOtp({
        email,
      });

      if (error) {
        console.log(error);
      } else {
        setSuccess(true);
        alert("Check your email for the login link");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid
      className="Landing"
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <h1>Welcome to Splash Fam!</h1>
        <p style={{ maxWidth: "800px", lineHeight: "1.45" }}> 
                    Sign in to get started</p>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ py: 2 }}
      >
        <TextField
          sx={{ mr: 2 }}
          size="small"
          label="you@mail.com"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="contained" onClick={login} disabled={loading}>
          {loading ? "Loading..." : "Signup"}
        </Button>
      </Grid>
      <Grid item>
        <Image
          style={{
            maxWidth: "700px",
            width: "100%",
            height: "auto",
            margin: "auto",
          }}
          src={michael}
          alt="michael"
          className="pointer"
        />
      </Grid>
    </Grid>
  );
}
