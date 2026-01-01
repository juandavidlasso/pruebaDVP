import { Box, Button, Card, CardActions, CardContent, Divider, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useLogin } from "../../auth/hooks/login/useLogin";

const LoginPage = () => {
  const { errors, register, onSubmit } = useLogin()
  return (
    <Box className="w-screen h-screen flex items-center justify-center bg-black px-3">
      <Card className="w-112.5 bg-white rounded-2xl! p-0 min-h-[60vh] flex flex-col justify-between pb-3 max-lg:w-[90%]">
        <Box className='h-fit w-full bg-[#232323] p-5 flex justify-center items-center'>
          <img src="/img/logo.png" alt="logo" />
        </Box>
        <form onSubmit={onSubmit}>
          <CardContent className="flex flex-col gap-8 items-center px-8!">
            <h2 className="text-black text-3xl font-bold">Sign In</h2>
            <Box className="w-full">
              <TextField variant="outlined" label="Email" type="text" fullWidth placeholder="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
            </Box>
            <Box className="w-full">
              <TextField variant="outlined" label="Password" type="password" fullWidth placeholder="Password" {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
            </Box>
            <Box className="w-full">
              <Button type="submit" variant="contained" fullWidth className="bg-black! hover:bg-[#7D2D6F]! normal-case! text-xl! py-2!">Sign In</Button>
            </Box>
          </CardContent>
        </form>
        <Divider className="bg-gray-600 w-[90%] mx-auto! my-3!" />
        <CardActions>
          <Box className="w-full flex justify-center items-center mb-4 gap-3">
            <span className="text-gray-600 text-xl">Don't have an account?</span>
            <Link to="/register" className="text-[#7D2D6F]! text-xl hover:underline!">Sign Up</Link>
          </Box>
        </CardActions>
      </Card>
    </Box>
  )
}

export default LoginPage;