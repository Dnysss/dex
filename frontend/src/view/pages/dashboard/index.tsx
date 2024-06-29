import { useAuth } from "../../../hooks/useAuth";
import Button from "../../components/buttons/Button";

export function Dashboard() {
  const { signout } = useAuth();
  return (
    <div>
      <h1>Dashboard Page</h1>

      <Button onClick={signout}>Sair</Button>
    </div>
  );
}
