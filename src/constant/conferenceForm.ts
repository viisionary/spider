import {FieldType} from "../components/PresetForm";

export const conferenceFields = [
    {
        label: '会议名称',
        id: 'meetingTheme',
        required: true,
        fieldType: FieldType.text,
        max: 10,
    },
    {
        label: '会议议程',
        id: 'meetingContent',
        fieldType: FieldType.textArea,
        max: 10,
    },
    {
        label: '会议时长', fieldType: FieldType.number, id: 'meetingLengthHour', required: true,
    },
    {
        label: '视频质量类型',
        required: true,
        id: 'meetingMode',
        fieldType: FieldType.radioGroup,
        staticOptions: [
            {label: '标清(480p)', value: '1'},
            {label: '高清(720p)', value: '2'},
            {label: '超清(1080p)', value: '3'}
        ],
    },
    {
        label: '会议初始视频布局类型',
        required: true,
        fieldType: FieldType.radioGroup,
        id: 'videoLayout',
        staticOptions: [
            {label: '左右布局/九宫格布局', value: '1'},
            {label: '画中画布局/联合国布局', value: '2'}
        ]
    },
    {
        required: true,
        label: '会议的音频编码格式', fieldType: FieldType.radioGroup, id: 'audioCodecType', staticOptions: [
            {label: 'AAC', value: '1'},
            {label: 'PCMA', value: '2'},
            {label: 'AMRNB', value: '3'},
            {label: 'AMRWB', value: '4'},

        ]
    },
    {
        required: true,
        label: '会议的音频采样格式', fieldType: FieldType.radioGroup, id: 'sampleFmt',
        staticOptions: [
            // AAC的时候只能选fltp/ PCMA只能选S16
            {label: 'fltp', value: '1', exclude: [{id: 'audioCodecType', value: ['2']}]},
            {label: 'S16', value: '2', exclude: [{id: 'audioCodecType', value: ['1']}]},
        ],
    },
    {
        required: true,
        label: '视频编码格式',
        fieldType: FieldType.radioGroup,
        id: 'videoCodecType',
        staticOptions: [{value: '1', label: 'H.264'}]
    },

];
export type meetingStatusType = { W: string, R: string, E: string }
export const meetingStatusText: meetingStatusType = {
    W: '未开始', R: '进行中', E: '已结束'
}
export const participantStatusText: any = {
    in: '会议中',
    leave: '离会'
}
export const getMeetingStatusText = (status: keyof meetingStatusType) => {
    return meetingStatusText[status] ? meetingStatusText[status] : ''
}
