import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { CommonService, GetPage } from '../../api';
import { Button, Card, CardContent, Container, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { Cancel, CancelOutlined, ContentCopy, Delete, Save } from '@mui/icons-material';
import { EventBus, EventType } from '../../utils/eventBus';
import { fancyDate } from '../../utils/stringFunctions';

const Editor = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [page, setPage] = useState<GetPage>();
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (params.id) {
            CommonService.getPage(params.id).then(setPage);
        }
    }, [params.id])
    useEffect(() => {
        setContent(page?.content ?? '');
        setTitle(page?.title ?? '');
    }, [page])

    const handleSave = async () => {
        if (params.id) {
            const updated = await CommonService.updatePage(params.id, {
                content, title
            })
            EventBus.dispatch(EventType.PAGE_UPDATED, updated);
            setPage(updated);
        }
    }

    const handleCopy = async () => {
        const created = await CommonService.createPage({ title: `${title} Copy`, content });
        EventBus.dispatch(EventType.PAGE_CREATED, created);
        navigate(`/page/edit/${created.id}`);
    }

    const handleDelete = async () => {
        if (!params.id) return;
        await CommonService.deletePage(params.id);
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
                        onClick={() => navigate(`/page/${params.id}`)}>
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