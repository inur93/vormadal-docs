import { ContentCopy, Delete, Edit } from "@mui/icons-material";
import { Button, Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import MDEditor from "@uiw/react-md-editor"
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { CommonService, GetPage } from "../../api";
import { EventBus, EventType } from "../../utils/eventBus";
import { fancyDate } from "../../utils/stringFunctions";


type Props = {

}

export const Page = (props: Props) => {
    const params = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState<GetPage>();
    const [notFound, setNotFound] = useState(false);
    useEffect(() => {
        if (params.id) {
            setNotFound(false);
            CommonService.getPage(params.id)
                .then(setPage)
                .catch(err => {
                    if (err?.response?.status === 404) {
                        setNotFound(true);
                    }
                })
        }
    }, [params.id])
    
    const handleCopy = async () => {
        const created = await CommonService.createPage({
            title: `${page?.title} Copy`, content: page?.content || ''
        });
        EventBus.dispatch(EventType.PAGE_CREATED, created);
        navigate(`/page/${created.id}`);
    }

    const handleDelete = async () => {
        if (!params.id) return;
        await CommonService.deletePage(params.id);
        EventBus.dispatch(EventType.PAGE_DELETED, params.id);
        navigate(`/`, { replace: true });
    }
    if (notFound) {
        return <Grid container style={{ height: '100%' }}>
            <Grid item container>
                <Typography variant="h1" fontSize={140}>
                    The page does no longer exist
                </Typography>
            </Grid>
        </Grid>
    }
    if (!page) return null;
    return <Grid container style={{ height: '100%' }}>
        <Grid item container>
            <Grid item xs={12} style={{ marginBottom: '1rem', marginRight: '1em' }}>
                <Card>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {page.author}
                        </Typography>
                        <Typography variant="h1" fontSize={40}>
                            {page.title}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {fancyDate(page.createdOn)}
                        </Typography>
                        <Button
                            color='primary'
                            variant='outlined'
                            startIcon={<Edit />}
                            onClick={() => navigate(`/page/edit/${params.id}`)}>
                            Edit
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
        </Grid>
        <Grid item xs={12} style={{ height: 'calc(100% - 180px)', marginRight: '1em', overflow: 'auto' }}>
            <MDEditor.Markdown source={page.content} />
        </Grid>
    </Grid>
}