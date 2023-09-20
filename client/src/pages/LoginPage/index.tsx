import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Anchor,
  Stack,
} from "@mantine/core";
import { GoogleButton } from "../../assets/SocialButtons";

import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useUserStorage } from '../../storage/userStorage';
import { useGetUserMutation } from "../../services/user";

function LoginPage(props: PaperProps) {
  const bcrypt = require("bcryptjs");
  const { name, email, accessToken, handleLogin, handleLogout } = useUserStorage();
  const [getUser] = useGetUserMutation();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val: string) =>
        val.length < 6 ? "Password should include at least 6 characters" : null,
    },
  });

  const navigate = useNavigate();

  function hashPassword(password: any) {
    try {
      const saltRounds = 10; // Количество "раундов" соли (рекомендуется от 10 и выше)
      const hashedPassword = bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  }

  async function sendRequestLogin() {
    const user = form.values;
    console.log(user);
    await hashPassword(user.password)
      .then((hashedPassword: string) => {
        user.password = hashedPassword;
      });
    getUser(user).then((response: any) => {
      console.log(response);
      //const resp = response.data;
      //const newUser = { name: resp.name, email: resp.email, accessToken: resp.accesToken, expirationTime: resp.expirationTime, refreshToken: resp.refreshToken };
      //handleLogin(newUser);
      navigate("/");
    });
  }

  return (
    <Paper
      style={{ width: "600px", margin: "0 auto" }}
      radius="md"
      p="xl"
      withBorder
      {...props}
    >
      <Text size="lg" weight={500}>
        Welcome to WHAT SHOULD U WATCH, login with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => { })}>
        <Stack>
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
        </Stack>

        <Group position="apart" mt="xl">
          <Link to="/reg">
            <Anchor component="button" type="button" color="dimmed" size="xs">
              "Don't have an account? Register
            </Anchor>
          </Link>
          <Button onClick={sendRequestLogin} type="submit" radius="xl">
            Login
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

export default LoginPage;
