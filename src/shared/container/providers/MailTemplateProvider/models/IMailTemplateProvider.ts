import IParseMailTamplateDTO from "../dtos/IParseMailTamplateDTO";

export default interface IMailTemplateProvider{
  parse(data: IParseMailTamplateDTO): Promise<string>;
}
