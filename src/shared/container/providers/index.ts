import { container } from "tsyringe";
import IStorageProvider from "./models/IStorageProvider";
import DiskStorageProvider from "./implementations/DiskStorageProvider";
import IMailProvider from "./MailProvider/models/IMailProvider"
import EtherialMailProvider from "./MailProvider/implementations/EtherialMailProvider"
import IMailTemplateProvider from "./MailTemplateProvider/models/IMailTemplateProvider"
import HandlebarsMailTemplateProvider from "./MailTemplateProvider/implementations/HandlebarsMailTemplateProvider"

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider
)

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherialMailProvider)
)
