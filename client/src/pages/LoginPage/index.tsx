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
import Header from "../../components/Header";

function LoginPage(props: PaperProps) {
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


  async function sendRequestLogin() {
    const user = form.values;
    getUser(user).then((response: any) => {
      const resp = response.data;
      if (resp.tokenData !== null) {
        const newUser = {id: resp.id, name: resp.name, email: resp.email, accessToken: resp.tokenData.accessToken, expirationTime: 'resp.expirationTime', refreshToken: resp.tokenData.refreshToken };
        handleLogin(newUser);
        navigate("/");
      }
      else {
        alert('Ошибка логина или пароля');
      }
    });
  }
  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      const user = {
        email: '',
        password: '',
      };
      await signInWithPopup(auth, provider).then((userCredential) => {
        user.email = userCredential.user.email ?? '';
      })
      user.password = user.email;
      await getUser(user).then((response: any) => {
        const resp = response.data;
        if (resp.tokenData !== null) {
          const newUser = { id: resp.id,name: resp.name, email: resp.email, accessToken: resp.tokenData.accessToken, expirationTime: 'resp.expirationTime', refreshToken: resp.tokenData.refreshToken };
          handleLogin(newUser);
          navigate("/");
        }
        else {
          alert('Ошибка логина или пароля');
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

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
          <GoogleButton onClick={handleGoogleSignUp} radius="xl">Google</GoogleButton>
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
    </>
  );
}

export default LoginPage;
