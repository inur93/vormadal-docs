import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
    title?: string,
    description?: string,
    placeholder?: string,
    onAccept: (value: string) => void,
    onCancel: () => void,
    textFieldId: string
}
export default function FormDialog({ title, description, placeholder, textFieldId, onAccept, onCancel }: Props) {
    const [value, setValue] = React.useState('');
    return (
        <Dialog open={true} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {description}
                </DialogContentText>
                <TextField
                    data-cy='dialog-input'
                    autoFocus
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    margin="dense"
                    id={textFieldId}
                    label={placeholder}
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button data-cy='form-dialog-cancel' onClick={onCancel}>Cancel</Button>
                <Button data-cy='form-dialog-ok' color='primary' onClick={() => onAccept(value)}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}

export function CreateFolderDialog(props: Pick<Props, 'onAccept' | 'onCancel'>) {
    return (
        <FormDialog {...props} textFieldId='folder-name' placeholder='Name' title='Create folder' />
    )
}

export function CreatePageDialog(props: Pick<Props, 'onAccept' | 'onCancel'>) {
    return (
        <FormDialog {...props} textFieldId='page-name' placeholder='Name' title='Create page' />
    )
}