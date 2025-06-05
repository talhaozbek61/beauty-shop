import { useAuthStore } from "../../store/auth";

import Container from "../../components/ui/container";
import Heading from "./_components/heading";

export default function Page() {
  const { logout, user } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Container>
      <Heading name={user.name} onClick={handleLogout} />
    </Container>
  );
}
