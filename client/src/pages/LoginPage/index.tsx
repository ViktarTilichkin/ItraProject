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
import { useCreateUserMutation } from "../../services/user";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Импортируйте методы для аутентификации Firebase
import Header from "../../components/Header";

function LoginPage(props: PaperProps) {
  const [getUser] = useCreateUserMutation();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val: string) =>
        val.length < 6 ? "Password should include at least 6 characters" : null,
    },
  });

  const navigate = useNavigate();

  function sendRequest() {
    getUser(form.values).then(() => {
      navigate("/");
    });
  }

  const handleGoogleLogin = async () => {};

  return (
    <>
      <Header />
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

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={form.onSubmit(() => handleGoogleLogin())}>
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
                Don't have an account? Register
              </Anchor>
            </Link>
            <Button onClick={sendRequest} type="submit" radius="xl">
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </>
  );
}

export default LoginPage;
