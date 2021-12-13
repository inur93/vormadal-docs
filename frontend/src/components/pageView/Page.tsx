import { ContentCopy, Delete, Edit } from "@mui/icons-material";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { PageService, GetPage } from "../../api";
import { EventBus, EventType } from "../../utils/eventBus";
import { routes } from "../../utils/routes";
import { fancyDate } from "../../utils/stringFunctions";


type Props = {

}

export const Page = (props: Props) => {
    const params = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState<GetPage>();
    const [notFound, setNotFound] = useState(false);
    useEffect(() => {
        if (params.slug) {
            setNotFound(false);
            PageService.getPage(params.slug)
                .then(setPage)
                .catch(err => {
                    if (err?.response?.status === 404) {
                        setNotFound(true);
                    }
                })
        }
    }, [params.slug])

    const handleCopy = async () => {
        const created = await PageService.createPage({
            title: `${page?.title} Copy`, content: page?.content || ''
        });
        EventBus.dispatch(EventType.PAGE_CREATED, created);
        navigate(routes.editPage(created.id));
    }

    const handleDelete = async () => {
        if (!page?.id) return;
        await PageService.deletePage(page.id);
        EventBus.dispatch(EventType.PAGE_DELETED, page.id);
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
                            data-cy='edit-btn'
                            color='primary'
                            variant='outlined'
                            startIcon={<Edit />}
                            onClick={() => navigate(routes.editPage(page.id))}>
                            Edit
                        </Button>
                        {' '}
                        <Button
                            data-cy='duplicate-btn'
                            color='primary'
                            variant='outlined'
                            startIcon={<ContentCopy />}
                            onClick={handleCopy}>
                            Duplicate
                        </Button>
                        {' '}
                        <Button
                            data-cy='delete-btn'
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