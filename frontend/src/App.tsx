import MessagingApp from "./components/MessagingApp";
import { SocketProvider } from "./contexts/socket.context";

function App() {
  return (
    <>
      <SocketProvider>
        <MessagingApp />
      </SocketProvider>
    </>
  );
}

export default App;
