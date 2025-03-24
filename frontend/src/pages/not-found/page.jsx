import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Container from "../../components/ui/container";

export default function Page() {
  let navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, []);

  return (
    <Container>
      <h1 className="text-2xl">Page Not Found</h1>
    </Container>
  );
}
