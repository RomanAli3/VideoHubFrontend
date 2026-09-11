import { Outlet } from "react-router-dom";
import HeaderSection from "../components/headerSection";

function OutletPage() {
  return (
    <div>
      <HeaderSection/>
      <Outlet />
    </div>
  );
}

export default OutletPage;