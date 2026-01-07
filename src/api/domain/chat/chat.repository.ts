import { HttpService } from "../../baseRepositories/api/http/axios/axios-http-service";
import ApiRepository from "../../baseRepositories/api/respository";
import { ContentType, RequestData } from "../../http/Http";

export default class ChatRepository extends ApiRepository {
  constructor() {
    super("messages");
  }

  public async getEvents<T>(
    limit: number,
    offset: number
  ): Promise<T> {
    const data: RequestData = {
      endpoint: `${this.endpoint}`,
      params: { limit, offset },
    };

    return HttpService.getAsync(data);
  }

  public async sendTextMessage<T>(text: string): Promise<T> {
    const data: RequestData = {
      endpoint: `${this.endpoint}/send-text`,
      body: { text },
    };

    return HttpService.postAsync(data);
  }

  public async sendImageMessage<T>(formData: FormData): Promise<T> {
    const data: RequestData = {
      endpoint: `${this.endpoint}/send-image`,
      body: formData,
      headers: { "Content-Type": ContentType.FORMDATA },
    };

    return HttpService.postAsync(data);
  }
}
