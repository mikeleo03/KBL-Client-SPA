import axios from "axios";
import Cookies from "js-cookie";

import { API_URL } from "../constant";
import { TokenResponse } from "../types";

class TokenApi {
  private static token = Cookies.get("token") || "";
  private static axios = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    },
  });

  static async checkToken(token: string): Promise<TokenResponse> {
    try {
      const response = await this.axios.post<TokenResponse>("/token/check", { token });

      return response.data;
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }

  static async addCoins(userId: number, coinValue: number) {
    try {
      const response = await this.axios.post("/token/addCoins", { userId, coinValue });

      return response.data;
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }
}

export default TokenApi;
