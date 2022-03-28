import React, {useEffect, useRef} from 'react';
import Box from '@mui/material/Box';
const enduranceFilesList = (files: any) => {
    localStorage.setItem('filesList', JSON.stringify(files));
};

const getFilesList = () => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('filesList')) || [];
};

export function ResumableClientContainer() {
    const [progress, setProgress] = React.useState(10);
    // const [files, setFiles] = React.useState(List(getFilesList()));
    const uploadBtn = useRef();
    const uploadSquare = useRef();
    const resumableClient = useRef();


    return (
        <Box flexDirection={'row'} display={'flex'}>
            <Box margin={8}>
                <h1>分片上传 示例</h1>
                <h2>实现功能</h2>
                <ol>
                    <li>文件切片</li>
                    <li>按序上传</li>
                    <li>计算进度条</li>
                    <li>出错暂停重传，手动暂停重传</li>
                    <li>并发上传多个切片</li>
                    <li>
                        关闭/刷新tab后，可从接口【当前示例从local
                        storage恢复】恢复上传列表，重新选择文件恢复上传
                    </li>
                </ol>
                <h3>可扩充功能</h3>
                <ol>
                    <li>上传/重新选择时限制文件类型，</li>
                </ol>
                <h2>服务端行为</h2>
                <ol>
                    <li>get接口判断是否已上传过该文件、或该文件的部分分片</li>
                    <li>post 接口存储分片，合并分片</li>
                    <li>合成完毕给通知确保上传完成</li>
                    <li>定期清理碎片</li>
                    <li>delete接口 删除文件或碎片</li>
                </ol>
            </Box>
        </Box>
    );
}
