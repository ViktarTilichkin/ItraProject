import React, { useState, useEffect } from 'react';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";
import { GoogleButton } from "../../assets/SocialButtons";

import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../services/user";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useUserStorage } from '../../storage/userStorage';
import { IconChevronsDownLeft } from '@tabler/icons-react';


function RegistrationPage(props: PaperProps) {
  const bcrypt = require("bcryptjs");
  const { name, email, accessToken, handleLogin, handleLogout } = useUserStorage();
  const [createUser] = useCreateUserMutation();

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      provaiderName: '',
      AccesToken: "no",
      ExpirationTime: "no",
      RefreshToken: "no",
      terms: true,
    },

    validate: {
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val: string) =>
        val.length < 6 ? "Password should include at least 6 characters" : null,
    },
  });

  function hashPassword(password: any) {
    try {
      const saltRounds = 10; // Количество "раундов" соли (рекомендуется от 10 и выше)
      const hashedPassword = bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  }
  const navigate = useNavigate();
  async function sendRequest() {
    const user = form.values;
    await hashPassword(user.password)
      .then((hashedPassword: string) => {
        user.password = hashedPassword;
      });
    createUser(user).then((response: any) => {
      const resp = response.data;
      const newUser = { name: resp.name, email: resp.email, accessToken: resp.accesToken, expirationTime: resp.expirationTime, refreshToken: resp.refreshToken };
      handleLogin(newUser);
      navigate("/");
    });
  }

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      const user = {
        name: '',
        email: '',
        password: '',
        provaiderName: '',
        AccesToken: "no",
        ExpirationTime: "no",
        RefreshToken: "no",
      };
      await signInWithPopup(auth, provider).then((userCredential) => {
        user.provaiderName = userCredential.providerId ?? '';
        user.name = userCredential.user.displayName ?? '';
        user.email = userCredential.user.email ?? '';
        userCredential.user.getIdToken().then((accessToken) => {
          user.AccesToken = accessToken;
        });
        user.RefreshToken = userCredential.user.refreshToken;
      })
      await hashPassword(user.email)
        .then((hashedPassword: string) => {
          user.password = hashedPassword;
        });
      await createUser(user).then((response: any) => {
        const resp = response.data;
        const newUser = { name: resp.name, email: resp.email, accessToken: resp.accesToken, expirationTime: resp.expirationTime, refreshToken: resp.refreshToken };
        handleLogin(newUser);
        navigate("/");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper
      style={{ width: "600px", margin: "0 auto" }}
      radius="md"
      p="xl"
      withBorder
      {...props}
    >
      <Text size="lg" weight={500}>
        Welcome to WHAT SHOULD U WATCH, register with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton onClick={handleGoogleSignIn} radius="xl">Google</GoogleButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => { })}>
        <Stack>
          <TextInput
            label="Name"
            placeholder="Your name"
            value={form.values.name}
            onChange={(event) =>
              form.setFieldValue("name", event.currentTarget.value)
            }
            radius="md"
          />

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={form.errors.password}
            radius="md"
          />

          <Checkbox
            label="I accept terms and conditions"
            checked={form.values.terms}
            onChange={(event) =>
              form.setFieldValue("terms", event.currentTarget.checked)
            }
          />
        </Stack>

        <Group position="apart" mt="xl">
          <Link to="/login">
            <Anchor component="button" type="button" color="dimmed" size="xs">
              Already have an account? Login
            </Anchor>
          </Link>
          <Button onClick={sendRequest} type="submit" radius="xl">
            Register
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

export default RegistrationPage;