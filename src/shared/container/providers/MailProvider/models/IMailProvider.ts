import ISendMailDTO from "../dtos/ISendMAilDTO"

export default interface IMailProvider{
  sendMail(data: ISendMailDTO): Promise<void>;
}
