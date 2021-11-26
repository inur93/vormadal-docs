import { Article, ChevronRight, ExpandMore } from '@mui/icons-material';
import MuiTreeView from '@mui/lab/TreeView';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetPageSummary, PageService } from '../../api';
import { GetFolder } from '../../api/models/GetFolder';
import { FolderService } from '../../api/services/FolderService';
import { EventBus, EventType } from '../../utils/eventBus';
import { routes } from '../../utils/routes';
import { DeleteFolderDialog, DeletePageDialog } from '../dialog/AlertDialog';
import { CreateFolderDialog, CreatePageDialog } from '../dialog/FormDialog';
import { Node, TreeNode } from './TreeNode';

const addChildNodes = (node: Node, pages: Node[], folders: Node[], leaf: boolean): Node => {
    return {
        id: node.id,
        name: node.name,
        parent: node.parent,
        leaf,
        children: [
            ...folders
                .filter(x => x.parent === node.id)
                .map(x => addChildNodes(x, pages, folders, false)),
            ...pages
                .filter(x => x.parent === node.id)
                .map(x => addChildNodes(x, pages, folders, true))
        ]
    }
}

export const TreeView = () => {
    const [pages, setPages] = useState<GetPageSummary[]>([]);
    const [folders, setFolders] = useState<GetFolder[]>([]);
    const [data, setData] = useState<Node>();
    const params = useParams();
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState<string[]>([]);
    const [parentFolder, setParentFolder] = useState<string>();
    const [newFolder, setNewFolder] = useState(false);
    const [newPage, setNewPage] = useState(false);
    const [deleteFolder, setDeleteFolder] = useState<Node>();
    const [deletePage, setDeletePage] = useState<Node>();

    //auto expand to active page
    useEffect(() => {
        const find = (node: Node, id: string, list: string[]): boolean => {
            let match = node.id === id;
            for (let child of node.children) {
                match = match || find(child, id, list);
            }
            if(match){
                list.push(node.id);
            }
            return match;
        }
        if(!data || !params.id) return;
        let list: string[] = ['root'];
        find(data, params.id, list);
        setExpanded(list);
    }, [params.id, data])

    useEffect(() => {
        const root: Node = {
            id: 'root',
            name: 'Root',
            parent: 'root',
            children: [],
            leaf: false
        }

        setData(
            addChildNodes(
                root,
                pages.map(x => ({
                    id: x.id,
                    name: x.title,
                    parent: x.folder ?? 'root',
                    children: [],
                    leaf: true
                })),
                folders.map(x => ({
                    id: x.id,
                    name: x.name,
                    parent: (x.parentFolder as string) ?? 'root',
                    children: [],
                    leaf: false
                })),
                false
            ))
    }, [pages, folders]);

    useEffect(() => {
        PageService.getAllPages().then(setPages);
        FolderService.getAllFolders().then(setFolders);
        const listeners = [
            [
                EventType.FOLDER_UPDATED,
                EventBus.on(EventType.FOLDER_UPDATED, () => {
                    FolderService.getAllFolders().then(setFolders)
                })
            ],
            [
                EventType.FOLDER_DELETED,
                EventBus.on(EventType.FOLDER_DELETED, () => {
                    FolderService.getAllFolders().then(setFolders)
                    PageService.getAllPages().then(setPages)
                })
            ],
            [
                EventType.FOLDER_CREATED,
                EventBus.on(EventType.FOLDER_CREATED, () => {
                    FolderService.getAllFolders().then(setFolders)
                })
            ],
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
    const handleCreatePage = async (name: string) => {
        const page = await PageService.createPage({
            title: name,
            content: "",
            folder: parentFolder === 'root' ? undefined : parentFolder
        });
        navigate(routes.editPage(page.id));
        EventBus.dispatch(EventType.PAGE_CREATED, page);
        setNewPage(false);
        setParentFolder(undefined);
    }

    const handleCreateFolder = async (name: string) => {
        const page = await FolderService.createFolder({
            name: name,
            parentFolder: parentFolder === 'root' ? undefined : parentFolder
        });
        EventBus.dispatch(EventType.FOLDER_CREATED, page);
        setNewFolder(false);
        setParentFolder(undefined);
    }

    const handleDeleteFolder = async () => {
        if (!deleteFolder) return;
        await FolderService.deleteFolder(deleteFolder?.id);
        EventBus.dispatch(EventType.FOLDER_DELETED, undefined);
        setDeleteFolder(undefined);
    }

    const handleDeletePage = async () => {
        if (!deletePage) return;
        await PageService.deletePage(deletePage.id);
        EventBus.dispatch(EventType.PAGE_DELETED, undefined);
        setDeletePage(undefined);
    }

    const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };

    const renderTree = (nodes: Node) => (
        <TreeNode
            key={nodes.id}
            nodeId={nodes.id}
            label={nodes.name}
            endIcon={nodes.leaf ? <Article /> : null}
            contextMenuOptions={
                nodes.leaf ? [
                    {
                        label: "Delete Page",
                        onClick: () => {
                            setDeletePage(nodes);
                        }
                    },
                ] :
                    [
                        {
                            label: "Add Page",
                            onClick: () => {
                                setParentFolder(nodes.id);
                                setNewPage(true);
                            }
                        },
                        {
                            label: "Add Folder",
                            onClick: () => {
                                setParentFolder(nodes.id);
                                setNewFolder(true);
                            }
                        },
                        {
                            label: "Delete Folder",
                            onClick: () => {
                                setDeleteFolder(nodes)
                            }
                        },
                    ]
            }
        >
            {
                Array.isArray(nodes.children) ?
                    nodes.children.map((node) => renderTree(node)) :
                    null
            }
        </TreeNode>
    )
    return (<MuiTreeView
        aria-label="file system navigator"
        expanded={expanded}
        selected={params.id ?? 'root'}
        onNodeToggle={handleToggle}
        onNodeSelect={(e: React.SyntheticEvent, id: string) => {
            e.preventDefault();
            if (pages.find(x => x.id === id)) {
                navigate(routes.editPage(id));
            }
        }}
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
        sx={{
            // height: 240,
            // flexGrow: 1,
            // maxWidth: 400,
            // overflowY: 'auto'
        }}>
        {data && renderTree(data)}

        {newFolder && <CreateFolderDialog onAccept={handleCreateFolder} onCancel={() => setNewFolder(false)} />}
        {newPage && <CreatePageDialog onAccept={handleCreatePage} onCancel={() => setNewPage(false)} />}
        {!!deleteFolder && <DeleteFolderDialog onAccept={handleDeleteFolder} onCancel={() => setDeleteFolder(undefined)} folder={deleteFolder?.name} />}
        {!!deletePage && <DeletePageDialog onAccept={handleDeletePage} onCancel={() => setDeletePage(undefined)} page={deletePage.name} />}
    </MuiTreeView>);
}