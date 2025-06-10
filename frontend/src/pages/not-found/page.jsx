import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Container from "../../components/ui/container";

export default function Page() {
  let navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }, []);

  return (
    <Container>
      <h1 className="text-2xl dark:text-white">Page Not Found</h1>
    </Container>
  );
}
