import { TreeItem, treeItemClasses, TreeItemContentProps, TreeItemProps, useTreeItem } from "@mui/lab";
import { Menu, MenuItem, Typography } from "@mui/material";
import clsx from 'clsx';
import { forwardRef, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';

const CustomContentRoot = styled('div')(({ theme }) => ({
    WebkitTapHighlightColor: 'transparent',
    '&:hover, &.Mui-disabled, &.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused, &.Mui-selected:hover':
    {
        backgroundColor: 'transparent',
    },

    // marginLeft: 15,
    // paddingLeft: 18,
    // borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,

}));


export type Node = {
    id: string,
    name: string,
    parent: string,
    children: Node[],
    leaf?: boolean
}

type ContextMenuOption = {
    label: string,
    onClick: () => void
}
type ExtraProps = {
    // data?: T,
    contextMenuOptions?: ContextMenuOption[]
}
// type Props<T> = TreeItemContentProps & ExtraProps<T>
type Props = TreeItemContentProps

const CustomContent = (contextMenuOptions?: ContextMenuOption[]) => (forwardRef<unknown, Props>(
    function TreeNode(
        props: Props,
        ref
    ) {

        const {
            className,
            classes,
            label,
            nodeId,
            icon: iconProp,
            expansionIcon,
            displayIcon,

        } = props;

        const {
            disabled,
            expanded,
            selected,
            focused,
            handleExpansion,
            handleSelection,
            preventSelection,
        } = useTreeItem(nodeId);
        const [contextMenu, setContextMenu] = useState<{
            mouseX: number;
            mouseY: number;
        } | null>(null);

        const handleContextMenu = (event: React.MouseEvent) => {
            event.preventDefault();
            if (!contextMenuOptions) return;
            setContextMenu(
                contextMenu === null
                    ? {
                        mouseX: event.clientX - 2,
                        mouseY: event.clientY - 4,
                    }
                    : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
                    // Other native context menus might behave different.
                    // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                    null,
            );
        };

        const icon = iconProp || expansionIcon || displayIcon;

        const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            preventSelection(event);
        };
        
        const handleClose = () => {
            setContextMenu(null);
        };
        return (
            <CustomContentRoot
                className={clsx(className, classes.root, {
                    'Mui-expanded': expanded,
                    'Mui-selected': selected,
                    'Mui-focused': focused,
                    'Mui-disabled': disabled,
                })}

                onMouseDown={handleMouseDown}
                ref={ref as React.Ref<HTMLDivElement>}
            >
                {/* <div className="MuiTreeItem-contentBar" /> */}
                <div onClick={handleExpansion} className={classes.iconContainer}>{icon}</div>
                <Typography
                    onContextMenu={handleContextMenu}
                    onClick={handleSelection}
                    component="div"
                    className={classes.label}>
                    {label}
                </Typography>

                <Menu
                    open={contextMenu !== null}
                    onClose={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={contextMenu !== null ?
                        { top: contextMenu.mouseY, left: contextMenu.mouseX } :
                        undefined}>
                    {
                        !!(contextMenu !== null && contextMenuOptions) &&
                        contextMenuOptions
                            .map(x => (
                                <MenuItem key={`${nodeId}-${x.label}`}
                                    onClick={x.onClick}>
                                    {x.label}
                                </MenuItem>
                            ))
                    }
                </Menu>
            </CustomContentRoot>
        )
    }));

type NodeProps = TreeItemProps & ExtraProps
export function TreeNode({ contextMenuOptions, ...props }: NodeProps) {
    return <TreeItem {...props} ContentComponent={CustomContent(contextMenuOptions)} />
}