import { Add, Description } from '@mui/icons-material';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageService, GetPageSummary } from '../../api';
import { EventBus, EventType } from '../../utils/eventBus';
import {routes} from '../../utils/routes';

export const TreeView = () => {
    const [pages, setPages] = useState<GetPageSummary[]>([]);
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        PageService.getAllPages().then(setPages);
        const listeners = [
            [
                EventType.PAGE_CREATED,
                EventBus.on(EventType.PAGE_CREATED, () => {
                    PageService.getAllPages().then(setPages)
                })
            ],
            [
                EventType.PAGE_UPDATED,
                EventBus.on(EventType.PAGE_UPDATED, () => {
                    PageService.getAllPages().then(setPages)
                })
            ],
            [
                EventType.PAGE_DELETED,
                EventBus.on(EventType.PAGE_DELETED, () => {
                    PageService.getAllPages().then(setPages)
                })
            ]
        ]
        return () => {
            listeners.map(([t, l]) => EventBus.remove(t as string, l as EventListener));
        }
    }, []);
    const handleCreate = async () => {
        const page = await PageService.createPage({
            title: "New Page",
            content: "content"
        });
        navigate(routes.editPage(page.id));
        EventBus.dispatch(EventType.PAGE_CREATED, page);
    }
    return <List dense>
        <ListItemButton onClick={handleCreate}>
            <ListItemIcon>
                <Add />
            </ListItemIcon>
            <ListItemText primary="Create Page" />
        </ListItemButton>
        {pages.map(x =>
            <ListItemButton
                key={x.id}
                selected={x.id === params.id}
                onClick={() => navigate(routes.page(x.id))}>
                <ListItemIcon>
                    <Description />
                </ListItemIcon>
                <ListItemText primary={x.title} />
            </ListItemButton>
        )}
    </List>
}