import * as crypto from "crypto-js";

export function getSHA256(reqStr: string, signKey: string): string {
  try {
    const jsonObject = JSON.parse(reqStr);
    if (!jsonObject) {
      return "";
    }

    const keys = Object.keys(jsonObject).sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );

    let content = "";
    keys.forEach((key) => {
      if (key === "sign") {
        return;
      }

      const value = jsonObject[key];
      if (value === null || value === undefined || value === "") {
        return;
      }

      content += `${content.length > 0 ? "&" : ""}${key}=${value}`;
    });

    if (content.length > 0) {
      content += `&${signKey}`;
    } else {
      content = signKey;
    }

    // Correct way to generate SHA-256 hash using crypto-js
    return crypto.SHA256(content).toString(crypto.enc.Hex);
  } catch (error) {
    console.error("Error generating SHA-256 hash:", error);
    return "";
  }
}
