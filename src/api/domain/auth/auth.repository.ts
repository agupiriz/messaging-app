import { HttpService } from "../../baseRepositories/api/http/axios/axios-http-service";
import ApiRepository from "../../baseRepositories/api/respository";
import { RequestData } from "../../http/Http";
import { LoginRequest } from "./auth.types";

export default class AuthRepository extends ApiRepository {
  constructor() {
    super("auth");
  }

  public async login<T>(payload: LoginRequest): Promise<T> {
    const data: RequestData = {
      endpoint: `${this.endpoint}/login`,
      body: payload,
    };

    return HttpService.postAsync(data);
  }
}
