interface Target {
  bank: string
  branch: string
  account: string
}

interface Origin {
  bank: string
  branch: string
  cpf: string
}

export interface ICreateTransferDTO {
  event: string
  target: Target
  origin: Origin
  amount: number
}
