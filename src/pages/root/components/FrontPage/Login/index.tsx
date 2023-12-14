import Box from "@mui/material/Box";
import React from "react";
import SpaceEarth from "../../../../images/space-earth.jpg";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import FrontPageWrapper from "../FrontPageWrapper";
import { useMutation, useQueryClient } from "react-query";
import * as services from "../../../../../services";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

import SpaceEarthImage from "../../../../../images/space-earth.jpg";

interface UserInfo {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  const defaultUserInfo = {
    email: "",
    password: "",
  };

  const [userInfo, setUserInfo] = React.useState<UserInfo>(defaultUserInfo);

  const [mainErrorText, setMainErrorText] = React.useState<string>("");

  const [errorInputText, setErrorInputText] =
    React.useState<UserInfo>(defaultUserInfo);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (userInfo: UserInfo) => {
      return services.users.authenticate(userInfo.email, userInfo.password);
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["token"], data.data.token);
        queryClient.setQueryData(["user"], data.data.data);
        localStorage.setItem("user", JSON.stringify(data.data.data));
        navigate("/main/dashboard");
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
    if (userInfo.email == "") {
      return setErrorInputText((prev) => ({
        ...prev,
        email: "Email input is empty",
      }));
    } else if (!emailRegex.test(userInfo.email)) {
      return setErrorInputText((prev) => ({ ...prev, email: "Invalid Email" }));
    } else {
      setErrorInputText((prev) => ({ ...prev, email: "" }));
    }

    if (userInfo.password == "") {
      return setErrorInputText((prev) => ({
        ...prev,
        password: "Password input is empty",
      }));
    } else {
      setErrorInputText((prev) => ({ ...prev, password: "" }));
    }

    try {
      // authenticate
      await mutation.mutateAsync({
        email: userInfo.email,
        password: userInfo.password,
      });
      setMainErrorText("");
    } catch (error: any) {
      if (error.response?.data) {
        setMainErrorText(error.response.data);
      } else {
        setMainErrorText(error.message);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = e.target.name;
    setUserInfo((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    // <FrontPageWrapper>
    <Box
      sx={{
        backgroundImage: `url(${SpaceEarthImage})`,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // zIndex: -1,
        height: "100vh",
        width: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          zIndex: 1,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          width: "400px",
          p: theme.spacing(3),
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.89)",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Collapse in={mainErrorText != ""}>
          <Alert severity="error" onClose={() => setMainErrorText("")}>
            {mainErrorText}
          </Alert>
        </Collapse>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            value={userInfo.email}
            error={errorInputText["email"] != ""}
            helperText={errorInputText["email"]}
            onChange={handleChange}
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            name="password"
            fullWidth
            label="Password"
            value={userInfo.password}
            error={errorInputText["password"] != ""}
            helperText={errorInputText["password"]}
            onChange={handleChange}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
    </Box>
    // </FrontPageWrapper>
  );
};

export default Login;
