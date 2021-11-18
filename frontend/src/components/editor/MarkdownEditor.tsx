import { Cancel, ContentCopy, Delete, Save } from '@mui/icons-material';
import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageService, GetPage } from '../../api';
import { EventBus, EventType } from '../../utils/eventBus';
import {routes} from '../../utils/routes';

const Editor = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [page, setPage] = useState<GetPage>();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (params.id) {
            PageService.getPage(params.id).then(setPage);
        }
    }, [params.id]);

    useEffect(() => {
        setContent(page?.content ?? '');
        setTitle(page?.title ?? '');
    }, [page]);

    const handleSave = async () => {
        if (params.id) {
            const updated = await PageService.updatePage(params.id, {
                content, title
            })
            EventBus.dispatch(EventType.PAGE_UPDATED, updated);
            setPage(updated);
        }
    }

    const handleCopy = async () => {
        const created = await PageService.createPage({ title: `${title} Copy`, content });
        EventBus.dispatch(EventType.PAGE_CREATED, created);
        navigate(routes.editPage(created.id));
    }

    const handleDelete = async () => {
        if (!params.id) return;
        await PageService.deletePage(params.id);
        EventBus.dispatch(EventType.PAGE_DELETED, params.id);
        navigate(`/`, { replace: true });
    }

    const hasChanges = content !== page?.content || title !== page?.title;
    return (<Grid container spacing={2}>

        <Grid item xs={12} marginRight={'1em'}>
            <Card>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {page?.author}
                    </Typography>
                    <TextField
                        id="page-title"
                        variant="standard"
                        style={{ marginBottom: '1rem' }}
                        size='medium'
                        fullWidth
                        inputProps={{ style: { fontSize: 40 } }}
                        value={title}
                        onChange={e => setTitle(e.target.value)} />

                    <Button
                        color='primary'
                        variant='outlined'
                        startIcon={<Save />}
                        disabled={!hasChanges}
                        onClick={handleSave}>
                        Save
                    </Button>
                    {' '}
                    <Button
                        color='primary'
                        variant='outlined'
                        startIcon={<Cancel />}
                        onClick={() => navigate(routes.page(params.id))}>
                        Cancel
                    </Button>
                    {' '}
                    <Button
                        color='primary'
                        variant='outlined'
                        startIcon={<ContentCopy />}
                        onClick={handleCopy}>
                        Duplicate
                    </Button>
                    {' '}
                    <Button
                        color='error'
                        variant='outlined'
                        startIcon={<Delete />}
                        onClick={handleDelete}>
                        Delete
                    </Button>
                </CardContent>
            </Card>

        </Grid>
        <Grid item xs={12} marginRight={'1em'}>
            <MDEditor
                height={650}
                value={content}
                onChange={(val) => setContent(val || '')}
            />
        </Grid>
    </Grid>)
}

export default Editor;