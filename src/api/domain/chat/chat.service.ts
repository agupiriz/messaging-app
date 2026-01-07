import ChatRepository from "./chat.repository";
import { PaginatedMessages, SendMessageResponse } from "./chat.types";

export default class ChatService {
  private readonly chatRepository: ChatRepository;

  constructor() {
    this.chatRepository = new ChatRepository();
  }

  public async getEvents(
    limit: number,
    offset: number
  ): Promise<PaginatedMessages> {
    const chats = await this.chatRepository.getEvents<PaginatedMessages>(
      limit,
      offset
    );

    return chats;
  }

  public async sendTextMessage(text: string): Promise<SendMessageResponse> {
    const message =
      await this.chatRepository.sendTextMessage<SendMessageResponse>(text);

    return message;
  }

  public async sendImageMessage(
    formData: FormData
  ): Promise<SendMessageResponse> {
    const message =
      await this.chatRepository.sendImageMessage<SendMessageResponse>(formData);

    return message;
  }
}
