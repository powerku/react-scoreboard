import Layout from "./layout/Layout";
import Top from "./layout/Top";
import Bottom from "./layout/Bottom";
import classes from "./App.css";
import SoundButton from "./layout/SoundButton";
import Tooltip from "./layout/Tooltip";

function App() {
  return (
    <Layout>
      <Top></Top>
      <Bottom></Bottom>
      <SoundButton></SoundButton>
      <Tooltip></Tooltip>
    </Layout>
  );
}

export default App;
