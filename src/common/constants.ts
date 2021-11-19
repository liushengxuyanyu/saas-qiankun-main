interface IBusinessLine {
  id: number,
  code: string
}

interface ITaskStatus {
  value: string,
  label: string
}

// 存储常量代码
export const BUSINESS_LINE_CODES: IBusinessLine[] = [
  {
    id: 1,
    code: "EAM"
  },
  {
    id: 2,
    code: "GMS"
  },
  {
    id: 3,
    code: "SMS"
  },
  {
    id: 4,
    code: "TMS"
  },
  {
    id: 5,
    code: "WMS"
  },
  {
    id: 6,
    code: "DDS"
  },
  {
    id: 7,
    code: "QMS"
  }
]

export const TASK_STATUS_LIST: ITaskStatus[] = [
  {
    value: "3",
    label: "运行成功"
  },
  {
    value: "0",
    label: "待运行"
  },
  {
    value: "1",
    label: "运行中"
  },
  {
    value: "2",
    label: "运行失败"
  }
]