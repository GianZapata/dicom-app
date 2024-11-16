import { Box, Button, Container, Toolbar } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Container maxWidth='sm'>
      <Box display='flex' flexDirection="column" gap={3} marginTop={20}>
        <Link href="/auth/login" passHref>
          <Button variant="contained" fullWidth>
            Ir a inicio de sesión
          </Button>
        </Link>
        <Link href="/auth/register" passHref>
          <Button variant="contained" fullWidth>
          Ir a crear cuenta
          </Button>
        </Link>
      </Box>
    </Container>
  )
}
