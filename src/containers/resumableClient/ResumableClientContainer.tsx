//@ts-nocheck
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Resumable from 'resumablejs';
import LinearProgressWithLabel from './LinearProgressWithLabel';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Paper from '@material-ui/core/Paper';
import { List } from 'immutable';
import {
    createStyles,
    TableCell,
    TableRow,
    withStyles,
} from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { StyledTableCell, StyledTableRow } from './components';
import Box from '@material-ui/core/Box';

const enduranceFilesList = (files: any) => {
    localStorage.setItem('filesList', JSON.stringify(files));
};

const getFilesList = () => {
    return JSON.parse(localStorage.getItem('filesList')) || [];
};

export function ResumableClientContainer() {
    const [progress, setProgress] = React.useState(10);
    const [files, setFiles] = React.useState(List(getFilesList()));
    const uploadBtn = useRef();
    const uploadSquare = useRef();
    const resumableClient = useRef();

    useEffect(() => {
        const formattedFiles = files.map(({ file, progressRate }) => ({
            file: {
                fileName: file.fileName,
                uniqueIdentifier: file.uniqueIdentifier,
                size: file.size,
            },
            progressRate,
            status: 'paused',
        }));
        enduranceFilesList(formattedFiles);
    }, [files]);
    React.useEffect(() => {
        resumableClient.current = new Resumable({
            target: 'http://127.0.0.1:8083/api/upload/resumable',
            method: 'post',
            // query: { upload_token: "my_token" }
        });
        uploadBtn && resumableClient.current.assignBrowse(uploadSquare.current);
        uploadSquare &&
            resumableClient.current.assignDrop(uploadSquare.current);

        resumableClient.current.on('fileAdded', function (file, event) {
            const index = files.findIndex(
                (fileInfo) =>
                    fileInfo.file.uniqueIdentifier === file.uniqueIdentifier
            );
            if (index > -1) {
                setFiles((pre) =>
                    pre.update(index, (preFile) => ({
                        status: 'ready',
                        file,
                        progressRate: preFile.progressRate,
                    }))
                );
                return;
            }
            setFiles((pre) =>
                pre.push({ file, status: 'ready', progressRate: 0 })
            );
        });
        resumableClient.current.on('fileSuccess', function (file, message) {
            try {
                const { uniqueIdentifier, progress } = file;
                setFiles((pre) =>
                    pre.update(
                        pre.findIndex(
                            (fileInfo) =>
                                fileInfo.file.uniqueIdentifier ===
                                uniqueIdentifier
                        ),
                        (fileInfo) => ({
                            ...fileInfo,
                            status: 'done',
                            address: message,
                        })
                    )
                );
            } catch (e) {
                console.warn(e);
            }
        });
        resumableClient.current.on('fileError', function (file, message) {
            try {
                file.pause();
                const { uniqueIdentifier, progress } = file;
                setFiles((pre) =>
                    pre.update(
                        pre.findIndex(
                            (fileInfo) =>
                                fileInfo.file.uniqueIdentifier ===
                                uniqueIdentifier
                        ),
                        (fileInfo) => ({
                            ...fileInfo,
                            status: 'error',
                        })
                    )
                );
            } catch (e) {
                console.warn(e);
            }
        });
        resumableClient.current.on('fileProgress', function (file, message) {
            try {
                const { uniqueIdentifier, progress, chunks } = file;
                setFiles((pre) =>
                    pre.update(
                        pre.findIndex(
                            (fileInfo) =>
                                fileInfo.file.uniqueIdentifier ===
                                uniqueIdentifier
                        ),
                        (fileInfo) => ({
                            ...fileInfo,
                            progressRate: progress() * 100,
                            status: 'uploading',
                        })
                    )
                );
            } catch (e) {
                console.warn(e);
            }
        });
        resumableClient.current.on('uploadStart', function (file, message) {
            try {
                const { uniqueIdentifier, progress } = file;
                setFiles((pre) =>
                    pre.update(
                        pre.findIndex(
                            (fileInfo) =>
                                fileInfo.file.uniqueIdentifier ===
                                uniqueIdentifier
                        ),
                        (fileInfo) => ({
                            ...fileInfo,
                            status: 'uploading',
                        })
                    )
                );
            } catch (e) {
                console.warn(e);
            }
        });
    }, [uploadBtn]);

    const handleStartUpload = (file, index) => {
        if (!file.retry) {
            uploadSquare.current.click();
            return;
        }
        file.retry();
    };
    const handlePause = (file) => {
        try {
            file.pause();
            const { uniqueIdentifier, progress } = file;
            setFiles((pre) =>
                pre.update(
                    pre.findIndex(
                        (fileInfo) =>
                            fileInfo.file.uniqueIdentifier === uniqueIdentifier
                    ),
                    (fileInfo) => ({
                        ...fileInfo,
                        status: 'paused',
                    })
                )
            );
        } catch (e) {
            console.warn(e);
        }
    };
    const handleDelete = (file, index) => {
        file.abort && file.abort();
        setFiles((pre) => pre.delete(index));
    };
    return (
        <Box flexDirection={'row'} display={'flex'}>
            <Box margin={8}>
                <h1>???????????? ??????</h1>
                <h2>????????????</h2>
                <ol>
                    <li>????????????</li>
                    <li>????????????</li>
                    <li>???????????????</li>
                    <li>???????????????????????????????????????</li>
                    <li>????????????????????????</li>
                    <li>
                        ??????/??????tab????????????????????????????????????local
                        storage????????????????????????????????????????????????????????????
                    </li>
                </ol>
                <h3>???????????????</h3>
                <ol>
                    <li>??????/????????????????????????????????????</li>
                </ol>
                <h2>???????????????</h2>
                <ol>
                    <li>get?????????????????????????????????????????????????????????????????????</li>
                    <li>post ?????????????????????????????????</li>
                    <li>???????????????????????????????????????</li>
                    <li>??????????????????</li>
                    <li>delete?????? ?????????????????????</li>
                </ol>
            </Box>
            <div>
                <Paper
                    ref={uploadSquare}
                    variant="outlined"
                    square
                    style={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        width: 200,
                        height: 120,
                        margin: '20px auto',
                        paddingTop: 80,
                    }}
                >
                    ?????? ??? ????????????
                </Paper>
                <Paper />
                <Paper
                    style={{
                        textAlign: 'center',
                        width: 200,
                        margin: '20px auto',
                    }}
                >
                    ???????????????{files.size}
                    <br />
                    ???????????????1M
                </Paper>
                <TableContainer
                    style={{ width: 960, margin: '0 auto' }}
                    component={Paper}
                >
                    <TableRow>
                        <StyledTableCell>?????????</StyledTableCell>
                        <StyledTableCell>??????&nbsp;(MB)</StyledTableCell>
                        <StyledTableCell>??????</StyledTableCell>
                        <StyledTableCell>??????</StyledTableCell>
                        <StyledTableCell>??????</StyledTableCell>
                        <StyledTableCell>??????</StyledTableCell>
                    </TableRow>
                    <TableBody>
                        {files.map(
                            (
                                { file, status, progressRate, address },
                                index
                            ) => {
                                const {
                                    fileName,
                                    uniqueIdentifier,
                                    chunks,
                                    progress,
                                    size,
                                } = file;
                                return (
                                    <StyledTableRow key={uniqueIdentifier}>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                            style={{ width: 387 }}
                                        >
                                            ????????????{fileName}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            ?????????
                                            {Math.floor(size / 1024 / 1024)}MB
                                        </StyledTableCell>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            {progress &&
                                                Math.floor(
                                                    progress() * chunks.length
                                                )}{' '}
                                            / {chunks && chunks.length}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            <LinearProgressWithLabel
                                                progress={progressRate}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            {status === 'uploading' &&
                                                '????????????'}
                                            {status === 'error' && '????????????'}
                                            {status === 'paused' && '?????????'}
                                            {status === 'ready' && '?????????'}
                                            {status === 'done' && (
                                                <div>
                                                    <a
                                                        href={` http://127.0.0.1:8083${address}`}
                                                    >
                                                        ??????????????? ????????????
                                                    </a>
                                                </div>
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            {[
                                                'ready',
                                                'error',
                                                'paused',
                                            ].includes(status) && (
                                                <IconButton
                                                    color="primary"
                                                    onClick={() =>
                                                        handleStartUpload(
                                                            file,
                                                            index
                                                        )
                                                    }
                                                    aria-label="delete"
                                                >
                                                    <PlayCircleOutlineIcon fontSize="small" />
                                                </IconButton>
                                            )}
                                            {['uploading', 'error'].includes(
                                                status
                                            ) && (
                                                <IconButton
                                                    color="primary"
                                                    onClick={() =>
                                                        handlePause(file, index)
                                                    }
                                                    aria-label="pause"
                                                >
                                                    <PauseCircleOutlineIcon fontSize="small" />
                                                </IconButton>
                                            )}
                                            <IconButton
                                                color="primary"
                                                onClick={() =>
                                                    handleDelete(file, index)
                                                }
                                                aria-label="delete"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            }
                        )}
                    </TableBody>
                </TableContainer>
            </div>
        </Box>
    );
}
