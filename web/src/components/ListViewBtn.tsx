import { Button } from "@mui/material";
import { useRouter } from "next/navigation";


const ListViewBtn = () => {
    const router = useRouter();
    const handleGotoListView = () => {
        router.push("/employee/list");
    };
    
  return (
    <Button
      variant="contained"
      color="secondary"
      sx={{ borderRadius: 10, marginRight: 2 }}
      onClick={handleGotoListView}
    >
      List View
    </Button>
  );
};

export default ListViewBtn;
