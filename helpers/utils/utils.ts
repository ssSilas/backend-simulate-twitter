import { Injectable } from "@nestjs/common";

@Injectable()
export class Utils {
  statusTweets() {
    return {
      desativado: 0,
      ativado: 1,
      oculto: 2,
    }
  }
}