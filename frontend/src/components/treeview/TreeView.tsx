import { Add, Description } from '@mui/icons-material';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CommonService, GetPageSummary } from '../../api';
import { EventBus, EventType } from '../../utils/eventBus';

export const TreeView = () => {
    const [pages, setPages] = useState<GetPageSummary[]>([]);
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        CommonService.getAllPages().then(setPages);
        const listeners = [
            [
                EventType.PAGE_CREATED,
                EventBus.on(EventType.PAGE_CREATED, () => {
                    CommonService.getAllPages().then(setPages)
                })
            ],
            [
                EventType.PAGE_UPDATED,
                EventBus.on(EventType.PAGE_UPDATED, () => {
                    CommonService.getAllPages().then(setPages)
                })
            ],
            [
                EventType.PAGE_DELETED,
                EventBus.on(EventType.PAGE_DELETED, () => {
                    CommonService.getAllPages().then(setPages)
                })
            ]
        ]
        return () => {
            listeners.map(([t, l]) => EventBus.remove(t as string, l as EventListener));
        }
    }, []);
    const handleCreate = async () => {
        const page = await CommonService.createPage({
            title: "New Page",
            content: "content"
        });
        navigate(`/page/${page.id}`);
        EventBus.dispatch(EventType.PAGE_CREATED, page);
    }
    return <List dense>
        <ListItemButton onClick={handleCreate}>
            <ListItemIcon>
                <Add />
            </ListItemIcon>
            <ListItemText primary="Create page" />
        </ListItemButton>
        {pages.map(x =>
            <ListItemButton
                key={x.id}
                selected={x.id === params.id}
                onClick={() => navigate(`/page/${x.id}`)}>
                <ListItemIcon>
                    <Description />
                </ListItemIcon>
                <ListItemText primary={x.title} />
            </ListItemButton>
        )}
    </List>
}