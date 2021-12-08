/**
 * 加密公钥
 */
export const ENCRYPTION_KEY = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjnBV+yMC1R31wxb6dNiFWDw53zwRC5bkfna/WUGPcurq8/zJ1rfXk71zggGAslxoZ02d/d/lYFYDCAj2gaWW2CV8hQy82TQNo7ukm3kAfcTDahhZKmm8sdTxxok4xvMYa9tee692FHj23eeIIms0dzsXLxX7X18qhhNvBoezGxn7nPSr3HEc9Pylvoi2x3CjPb1DkIik7wbwBN3eY7oOJn/RSVvpeF/MbdDu+ThwB2mgInVkFeWRpWiSnrfjTk7dFoJdJLwN+JhYkEa4JqLiKRWxt7Vc4o11JHHpMveVwtzzcggCcXSMeOoEjudQDWk5xTl+kiAq7MZ+c4p6p7Kt2QIDAQAB`

export const SMS_COUNTDOWN_SECOUNDS: number = 60

interface IBusinessLine {
  id: number
  code: string
}

interface ITaskStatus {
  value: string
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
