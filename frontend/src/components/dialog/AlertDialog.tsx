import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

type Props = {
    title?: string,
    description?: string,
    onAccept: () => void,
    onCancel: () => void
}
export default function FormDialog({ title, description, onAccept, onCancel }: Props) {
    return (
        <Dialog open={true} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onAccept}>Yes</Button>
            </DialogActions>
        </Dialog>
    );
}

export function DeleteFolderDialog(props: Pick<Props, 'onAccept' | 'onCancel'> & { folder?: string }) {
    return (
        <FormDialog {...props} title={props.folder} description={`Are you sure you want to delete this folder?`} />
    )
}

export function DeletePageDialog(props: Pick<Props, 'onAccept' | 'onCancel'> & { page?: string }) {
    return (
        <FormDialog {...props} title={props.page} description={`Are you sure you want to delete this page?`} />
    )
}