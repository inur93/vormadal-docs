import { Description } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";

type Props = {
    id: string,
    name: string
}
export const TreeLeaf = ({ id, name }: Props) => {
    const navigate = useNavigate();

    return (
        <ListItemButton
            onClick={() => navigate(routes.page(id))}>
            <ListItemIcon>
                <Description />
            </ListItemIcon>
            <ListItemText primary={name} />
        </ListItemButton>
    )
}