// src/types/axios.d.ts
import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    isPublic?: boolean;
  }
}
